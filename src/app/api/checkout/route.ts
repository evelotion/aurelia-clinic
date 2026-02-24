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

    // 1. Kalkulasi Harga & Diskon Membership
    const basePrice = appointment.treatmentBranch.price;
    const discountPercentage = appointment.patient.membership?.discountPercentage || 0;
    const grossAmount = basePrice - (basePrice * discountPercentage / 100);

    // Bikin Order ID unik untuk Midtrans
    const orderId = `AURELIA-${appointment.id}-${Date.now()}`;

    // 2. Setup Midtrans Auth
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    // Jika tidak ada server key (misal buyer belum set), kita fallback ke simulasi URL sementara
    if (!serverKey) {
       const simulationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/patient?payment=success&order_id=${orderId}`;
       return NextResponse.json({ url: simulationUrl });
    }

    const encodedSecret = Buffer.from(serverKey + ":").toString("base64");
    const basicAuth = `Basic ${encodedSecret}`;

    // 3. Payload untuk Midtrans Snap API
    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: appointment.patient.name,
        email: appointment.patient.email,
        phone: appointment.patient.phone || "",
      },
      item_details: [
        {
          id: appointment.treatmentBranch.treatment.id,
          price: grossAmount,
          quantity: 1,
          name: appointment.treatmentBranch.treatment.name.substring(0, 50), // Midtrans membatasi nama item maks 50 karakter
        }
      ]
    };

    // 4. Hit API Midtrans (Gunakan Sandbox URL untuk development)
    const midtransApiUrl = process.env.MIDTRANS_IS_PRODUCTION === "true" 
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const response = await fetch(midtransApiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": basicAuth,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MIDTRANS_API_ERROR:", data);
      return new NextResponse("Payment Gateway Error", { status: 500 });
    }

    // 5. Update Appointment dengan Order ID yang dikirim ke Midtrans
    await prisma.appointment.update({
      where: { id: appointment.id },
      data: { stripeSessionId: orderId } // Menggunakan field yang ada untuk menampung order ID
    });

    // Kembalikan URL Snap Midtrans ke frontend
    return NextResponse.json({ url: data.redirect_url });

  } catch (error) {
    console.error("CHECKOUT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}