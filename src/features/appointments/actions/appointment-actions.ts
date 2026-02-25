"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { bookingSchema } from "../schemas/appointment-schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createAppointment(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "PATIENT") return { error: "Unauthorized" };

  const data = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(data);
 
  if (!parsed.success) return { error: (parsed.error as any).errors[0].message };

  try {
    const treatmentBranch = await prisma.treatmentBranch.findUnique({
      where: { treatmentId_branchId: { treatmentId: parsed.data.treatmentId, branchId: parsed.data.branchId } }
    });
    if (!treatmentBranch) return { error: "Treatment not available at this branch." };

    const startTime = new Date(`${parsed.data.appointmentDate}T${parsed.data.appointmentTime}:00`);
    const endTime = new Date(startTime.getTime() + treatmentBranch.durationMin * 60000);

    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId: parsed.data.doctorId,
        status: { not: "CANCELLED" },
        OR: [
          { startTime: { lte: startTime }, endTime: { gt: startTime } },
          { startTime: { lt: endTime }, endTime: { gte: endTime } }
        ]
      }
    });

    if (conflictingAppointment) return { error: "Doctor is already booked for this time." };

    await prisma.appointment.create({
      data: {
        patientId: session.user.id,
        doctorId: parsed.data.doctorId,
        treatmentBranchId: treatmentBranch.id,
        startTime: startTime,
        endTime: endTime,
        status: "PENDING",
      },
    });

    revalidatePath("/patient"); revalidatePath("/admin/appointments"); revalidatePath("/doctor/appointments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to book appointment." };
  }
}

export async function getAllAppointments() {
  return await prisma.appointment.findMany({
    include: { patient: true, doctor: { include: { user: true } }, treatmentBranch: { include: { treatment: true, branch: true } } },
    orderBy: { startTime: 'desc' }
  });
}

export async function getDoctorAppointments(userId: string) {
  const doctor = await prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) return [];
  return await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    include: { patient: true, treatmentBranch: { include: { treatment: true, branch: true } } },
    orderBy: { startTime: 'asc' }
  });
}

export async function getPatientAppointments(patientId: string) {
  return await prisma.appointment.findMany({
    where: { patientId: patientId },
    include: { 
      doctor: { include: { user: true } }, 
      treatmentBranch: { include: { treatment: true, branch: true } } 
    },
    orderBy: { startTime: 'desc' }
  });
}

export async function updateAppointmentStatus(appointmentId: string, newStatus: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role === "PATIENT") return { error: "Unauthorized action." };

  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus as any },
    });
    revalidatePath("/admin/appointments"); revalidatePath("/doctor/appointments"); revalidatePath("/patient");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status." };
  }
}

export async function getAvailableSlots(doctorId: string, date: string) {
  // Parsing tanggal yang dipilih pasien
  const targetDate = new Date(date);
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  // Tarik jadwal dokter yang sudah ada (kecuali yang di-cancel)
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      status: { not: "CANCELLED" },
      startTime: { gte: startOfDay, lte: endOfDay }
    },
    select: { startTime: true, endTime: true }
  });

  // Jam operasional klinik (Bisa disesuaikan nanti)
  const allSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  // Filter jam yang bertabrakan dengan jadwal existing
  const availableSlots = allSlots.filter(slot => {
    const [hours, minutes] = slot.split(':');
    const slotTime = new Date(date);
    slotTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    // Cek apakah jam ini sudah dipakai
    const isBooked = existingAppointments.some(apt => {
      // Kita anggap 1 slot memakan waktu dari startTime sampai tepat sebelum endTime
      return slotTime >= apt.startTime && slotTime < apt.endTime;
    });

    return !isBooked;
  });

  return availableSlots;
}