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
