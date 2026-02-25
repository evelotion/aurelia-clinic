import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Error: DATABASE_URL environment variable is missing in your .env file.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding for Aurelia Clinic...");
  console.log("⏳ Please wait, generating 100+ dummy operational data...");

  // Hapus data lama biar gak numpuk (Urutan penting agar tidak kena Foreign Key constraint)
  await prisma.verificationToken.deleteMany();
  await prisma.beforeAfterGallery.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.treatmentBranch.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.membershipTier.deleteMany();

  // 1. Buat Membership
  const gold = await prisma.membershipTier.create({ data: { name: "Gold VIP", discountPercentage: 20 } });
  const silver = await prisma.membershipTier.create({ data: { name: "Silver", discountPercentage: 10 } });

  // 2. Buat Cabang Klinik
  const senopati = await prisma.branch.create({
    data: { name: "Aurelia Senopati", address: "Jl. Senopati No. 88", city: "Jakarta Selatan", phone: "+62811223344", isActive: true }
  });
  const menteng = await prisma.branch.create({
    data: { name: "Aurelia Menteng", address: "Jl. Menteng Raya No. 12", city: "Jakarta Pusat", phone: "+62811556677", isActive: true }
  });

  // 3. Buat Master Treatment
  const picoLaser = await prisma.treatment.create({
    data: { 
      name: "PicoSure Pro Laser", category: "Aesthetic", description: "Advanced laser treatment for pigmentation and skin rejuvenation.", image: "/images/treatment-anti-aging.jpg"
    }
  });
  const thermage = await prisma.treatment.create({
    data: { 
      name: "Thermage FLX Skin Tightening", category: "Dermatology", description: "Non-invasive radiofrequency therapy to smooth, tighten and contour skin.", image: "/images/treatment-injection.jpg"
    }
  });

  // 4. Hubungkan Treatment ke Cabang (Harga & Durasi)
  const tbPicoSenopati = await prisma.treatmentBranch.create({ data: { treatmentId: picoLaser.id, branchId: senopati.id, price: 4500000, durationMin: 45, isActive: true } });
  const tbPicoMenteng = await prisma.treatmentBranch.create({ data: { treatmentId: picoLaser.id, branchId: menteng.id, price: 4200000, durationMin: 45, isActive: true } });
  const tbThermageSenopati = await prisma.treatmentBranch.create({ data: { treatmentId: thermage.id, branchId: senopati.id, price: 12000000, durationMin: 90, isActive: true } });

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 5. Buat Akun Admin
  await prisma.user.create({
    data: { name: "Super Admin", email: "admin@aurelia.com", password: hashedPassword, role: "ADMIN", emailVerified: new Date() }
  });

  // 6. Buat Akun Dokter & Profilnya
  const drAlexUser = await prisma.user.create({
    data: { name: "Dr. Alexander Pierce", email: "dr.alex@aurelia.com", password: hashedPassword, role: "DOCTOR", image: "/images/doctor-portrait.jpg", emailVerified: new Date() }
  });
  const drAlex = await prisma.doctor.create({
    data: { userId: drAlexUser.id, branchId: senopati.id, specialization: "Aesthetic Medicine", bio: "Certified in Beverly Hills with 15+ years experience.", isActive: true }
  });

  const drNadiaUser = await prisma.user.create({
    data: { name: "Dr. Nadia Larasati, Sp.KK", email: "dr.nadia@aurelia.com", password: hashedPassword, role: "DOCTOR", image: "/images/doctor-portrait.jpg", emailVerified: new Date() }
  });
  const drNadia = await prisma.doctor.create({
    data: { userId: drNadiaUser.id, branchId: menteng.id, specialization: "Dermatology", bio: "Top dermatologist specializing in anti-aging.", isActive: true }
  });

  // 7. Buat Pasien Spesifik (Untuk keperluan testing lo)
  const patientJessica = await prisma.user.create({
    data: { name: "Jessica Mila", email: "patient@demo.com", password: hashedPassword, role: "PATIENT", membershipId: gold.id, phone: "081299887766", emailVerified: new Date() }
  });

  // 8. Buat Galeri
  await prisma.beforeAfterGallery.create({
    data: { treatmentId: picoLaser.id, imageBefore: "/images/gallery-before.jpg", imageAfter: "/images/gallery-after.jpg", showOnWeb: true }
  });

  console.log("✅ Core data created. Generating 30 Patients and 70 Appointments...");

  // ==========================================================
  // GENERATOR DATA MASAL (100 DATA)
  // ==========================================================
  
  const now = new Date();
  const generatedPatients = [patientJessica];

  // A. Generate 30 Pasien Random
  for (let i = 1; i <= 30; i++) {
    const p = await prisma.user.create({
      data: {
        name: `Patient Demo ${i}`,
        email: `patient${i}@aurelia.test`,
        password: hashedPassword,
        role: "PATIENT",
        phone: `08120000${i.toString().padStart(4, '0')}`,
        emailVerified: new Date(),
        // Acak dapet membership silver atau gak ada
        membershipId: i % 5 === 0 ? silver.id : null,
      }
    });
    generatedPatients.push(p);
  }

  // B. Pilihan Kombinasi Layanan yang Tersedia
  const services = [
    { doc: drAlex.id, tb: tbPicoSenopati.id, duration: 45 },
    { doc: drAlex.id, tb: tbThermageSenopati.id, duration: 90 },
    { doc: drNadia.id, tb: tbPicoMenteng.id, duration: 45 }
  ];

  const appointmentStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];
  const paymentStatuses = ["UNPAID", "DEPOSIT_PAID", "FULLY_PAID", "REFUNDED"];

  // C. Generate 70 Appointment Random
  let appointmentsCreated = 0;
  for (let i = 1; i <= 70; i++) {
    const patient = generatedPatients[Math.floor(Math.random() * generatedPatients.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    
    // Acak status
    const status = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];
    const payStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

    // Acak Hari (antara 30 hari yang lalu sampai 30 hari ke depan)
    const daysOffset = Math.floor(Math.random() * 60) - 30;
    const aptDate = new Date(now.getTime() + (daysOffset * 24 * 60 * 60 * 1000));
    
    // Acak Jam (antara jam 09:00 pagi sampai jam 17:00 sore)
    aptDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);

    // Bikin catatan medis acak kalau statusnya udah selesai
    const notes = status === "COMPLETED" 
      ? "Patient responded well to the treatment. Skin showed mild redness which is normal. Prescribed calming cream to be used twice daily."
      : null;

    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: service.doc,
        treatmentBranchId: service.tb,
        startTime: aptDate,
        endTime: new Date(aptDate.getTime() + (service.duration * 60000)),
        status: status as any,
        paymentStatus: payStatus as any,
        medicalNotes: notes
      }
    });
    appointmentsCreated++;
  }

  console.log(`✅ Success! Generated 30 Patients and ${appointmentsCreated} Appointments.`);
  console.log("🎉 Seeding selesai! Database udah full sama data operasional komplit.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });