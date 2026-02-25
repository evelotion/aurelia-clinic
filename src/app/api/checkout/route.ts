import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { appointmentId } = await req.json();
    if (!appointmentId) return NextResponse.json({ error: "Appointment ID required" }, { status: 400 });

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: { include: { membership: true } },
        treatmentBranch: { include: { treatment: true } }
      }
    });

    if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 1. CEK API KEY DI .ENV
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // 2. LOGIC JIKA API KEY KOSONG -> Arahkan ke Halaman Simulasi
    if (!serverKey || serverKey === "") {
      return NextResponse.json({ url: `/patient/checkout/${appointmentId}` });
    }

    // 3. LOGIC JIKA API KEY ADA -> Generate Link Midtrans Asli
    // Pastikan lo udah install package-nya: npm install midtrans-client
    const midtransClient = require("midtrans-client");
    let snap = new midtransClient.Snap({
      isProduction: false, // ganti true kalau udah live
      serverKey: serverKey,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    });

    // Hitung harga final dengan diskon
    const basePrice = appointment.treatmentBranch.price;
    const discountPercent = appointment.patient.membership?.discountPercentage || 0;
    const finalPrice = basePrice - (basePrice * (discountPercent / 100));

    // Siapkan parameter untuk Midtrans
    let parameter = {
      transaction_details: {
        order_id: `AURELIA-${appointmentId}-${Date.now()}`,
        gross_amount: finalPrice
      },
      customer_details: {
        first_name: appointment.patient.name,
        email: session.user.email
      },
      item_details: [{
        id: appointment.treatmentBranch.treatment.id,
        price: finalPrice,
        quantity: 1,
        name: appointment.treatmentBranch.treatment.name
      }]
    };

    const transaction = await snap.createTransaction(parameter);
    
    // Kembalikan URL Snap Midtrans ke Client
    return NextResponse.json({ url: transaction.redirect_url });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}