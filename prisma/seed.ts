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

 
  await prisma.beforeAfterGallery.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.treatmentBranch.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.membershipTier.deleteMany();

 
  const gold = await prisma.membershipTier.create({ data: { name: "Gold VIP", discountPercentage: 20 } });
  const silver = await prisma.membershipTier.create({ data: { name: "Silver", discountPercentage: 10 } });

 
  const senopati = await prisma.branch.create({
    data: { name: "Aurelia Senopati", address: "Jl. Senopati No. 88", city: "Jakarta Selatan", phone: "+62811223344", isActive: true }
  });
  const menteng = await prisma.branch.create({
    data: { name: "Aurelia Menteng", address: "Jl. Menteng Raya No. 12", city: "Jakarta Pusat", phone: "+62811556677", isActive: true }
  });

 
  const picoLaser = await prisma.treatment.create({
    data: { 
      name: "PicoSure Pro Laser", 
      category: "Aesthetic", 
      description: "Advanced laser treatment for pigmentation and skin rejuvenation.",
      image: "/images/treatment-anti-aging.jpg"
    }
  });
  const thermage = await prisma.treatment.create({
    data: { 
      name: "Thermage FLX Skin Tightening", 
      category: "Dermatology", 
      description: "Non-invasive radiofrequency therapy to smooth, tighten and contour skin.",
      image: "/images/treatment-injection.jpg"
    }
  });

 
  const tbPicoSenopati = await prisma.treatmentBranch.create({
    data: { treatmentId: picoLaser.id, branchId: senopati.id, price: 4500000, durationMin: 45, isActive: true }
  });
  const tbPicoMenteng = await prisma.treatmentBranch.create({
    data: { treatmentId: picoLaser.id, branchId: menteng.id, price: 4200000, durationMin: 45, isActive: true }
  });
  const tbThermageSenopati = await prisma.treatmentBranch.create({
    data: { treatmentId: thermage.id, branchId: senopati.id, price: 12000000, durationMin: 90, isActive: true }
  });

 
  const hashedPassword = await bcrypt.hash("password123", 10);

 
  await prisma.user.create({
    data: { name: "Super Admin", email: "admin@aurelia.com", password: hashedPassword, role: "ADMIN" }
  });

 
  const drAlexUser = await prisma.user.create({
    data: { name: "Dr. Alexander Pierce", email: "dr.alex@aurelia.com", password: hashedPassword, role: "DOCTOR", image: "/images/doctor-portrait.jpg" }
  });
  const drAlex = await prisma.doctor.create({
    data: { userId: drAlexUser.id, branchId: senopati.id, specialization: "Aesthetic Medicine", bio: "Certified in Beverly Hills with 15+ years experience.", isActive: true }
  });

 
  const drNadiaUser = await prisma.user.create({
    data: { name: "Dr. Nadia Larasati, Sp.KK", email: "dr.nadia@aurelia.com", password: hashedPassword, role: "DOCTOR", image: "/images/doctor-portrait.jpg" }
  });
  const drNadia = await prisma.doctor.create({
    data: { userId: drNadiaUser.id, branchId: menteng.id, specialization: "Dermatology", bio: "Top dermatologist specializing in anti-aging.", isActive: true }
  });

 
  const patientJessica = await prisma.user.create({
    data: { name: "Jessica Mila", email: "patient@demo.com", password: hashedPassword, role: "PATIENT", membershipId: gold.id, phone: "081299887766" }
  });

 
  await prisma.beforeAfterGallery.create({
    data: {
      treatmentId: picoLaser.id,
      imageBefore: "/images/gallery-before.jpg",
      imageAfter: "/images/gallery-after.jpg",
      showOnWeb: true,
    }
  });

 
  const now = new Date();
  
 
  const pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  await prisma.appointment.create({
    data: {
      patientId: patientJessica.id,
      doctorId: drAlex.id,
      treatmentBranchId: tbPicoSenopati.id,
      startTime: pastDate,
      endTime: new Date(pastDate.getTime() + 45 * 60000),
      status: "COMPLETED",
      paymentStatus: "FULLY_PAID"
    }
  });

 
  const futureDate1 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  await prisma.appointment.create({
    data: {
      patientId: patientJessica.id,
      doctorId: drNadia.id,
      treatmentBranchId: tbPicoMenteng.id,
      startTime: futureDate1,
      endTime: new Date(futureDate1.getTime() + 45 * 60000),
      status: "CONFIRMED",
      paymentStatus: "FULLY_PAID"
    }
  });

 
  const futureDate2 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  await prisma.appointment.create({
    data: {
      patientId: patientJessica.id,
      doctorId: drAlex.id,
      treatmentBranchId: tbThermageSenopati.id,
      startTime: futureDate2,
      endTime: new Date(futureDate2.getTime() + 90 * 60000),
      status: "PENDING",
      paymentStatus: "UNPAID"
    }
  });

  console.log("✅ Seeding selesai! Database udah full sama data operasional komplit (Gallery & Appointments).");
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