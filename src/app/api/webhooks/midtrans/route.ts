import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

import { PaymentStatus, AppointmentStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";

    const hashed = crypto.createHash("sha512").update(`${order_id}${status_code}${gross_amount}${serverKey}`).digest("hex");
    if (hashed !== signature_key) {
      return new NextResponse("Invalid Signature", { status: 403 });
    }

    const appointmentId = order_id.split("-")[1];

    if (!appointmentId) return new NextResponse("Invalid Order ID", { status: 400 });

   
    let paymentStatus: PaymentStatus = "UNPAID";
    let appointmentStatus: AppointmentStatus = "PENDING";

    if (transaction_status === "capture" || transaction_status === "settlement") {
      paymentStatus = "FULLY_PAID";
      appointmentStatus = "CONFIRMED";
    } else if (transaction_status === "expire" || transaction_status === "cancel" || transaction_status === "deny") {
     
      paymentStatus = "UNPAID";
      appointmentStatus = "CANCELLED";
    } else if (transaction_status === "pending") {
      paymentStatus = "UNPAID";
      appointmentStatus = "PENDING"; 
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { 
        paymentStatus,
        status: appointmentStatus
      }
    });

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });

  } catch (error) {
    console.error("MIDTRANS_WEBHOOK_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}