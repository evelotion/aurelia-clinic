import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { appointmentId } = body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { 
        treatmentBranch: { include: { treatment: true } },
        patient: {
          include: { membership: true }
        } 
      }
    });

    if (!appointment) return new NextResponse("Appointment not found", { status: 404 });

    const mockTransactionId = `SIM-MIDTRANS-${Date.now()}`;
    const simulationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient?payment=success&order_id=${mockTransactionId}`;

    await prisma.appointment.update({
      where: { id: appointment.id },
      data: { stripeSessionId: mockTransactionId } 
    });

    return NextResponse.json({ url: simulationUrl });

  } catch (error) {
    console.error("MIDTRANS_SIMULATION_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
