import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/mail/mailer";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("?? Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

 
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const appointmentId = session.metadata?.appointmentId;

    if (appointmentId) {
     
      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          status: "CONFIRMED",
          paymentStatus: "FULLY_PAID",
        },
        include: {
          patient: true,
          treatmentBranch: { include: { treatment: true } }
        }
      });

     
      await sendBookingConfirmation(
        appointment.patient.email,
        appointment.patient.name,
        appointment.startTime.toLocaleString(),
        appointment.treatmentBranch.treatment.name
      );
    }
  }

  return new NextResponse(null, { status: 200 });
}
