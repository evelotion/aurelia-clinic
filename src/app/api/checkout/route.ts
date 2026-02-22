import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { appointmentId } = body;

    // 1. Tarik Appointment beserta relasi Patient dan Membership-nya
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { 
        treatmentBranch: { include: { treatment: true } },
        patient: {
          include: { membership: true } // <-- Ambil data diskon di sini
        } 
      }
    });

    if (!appointment) return new NextResponse("Appointment not found", { status: 404 });

    // 2. Kalkulasi Harga & Terapkan Diskon Membership
    let basePrice = appointment.treatmentBranch.price;
    let finalPrice = basePrice;
    let discountPercentage = 0;

    if (appointment.patient.membership) {
      discountPercentage = appointment.patient.membership.discountPercentage;
      finalPrice = basePrice - (basePrice * (discountPercentage / 100));
    }

    // 3. Tambahkan keterangan diskon di invoice Stripe (kalau ada)
    const descriptionString = discountPercentage > 0 
      ? `Appointment for ${appointment.patient.name} (Applied ${discountPercentage}% VIP Discount)`
      : `Appointment for ${appointment.patient.name}`;

    // 4. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: appointment.patient.email,
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: appointment.treatmentBranch.treatment.name,
              description: descriptionString,
            },
            unit_amount: Math.round(finalPrice * 100), // Stripe butuh format angka tanpa desimal (sen/cent)
          },
          quantity: 1,
        },
      ],
      // Redirect URL setelah pembayaran
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/patient?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/patient?payment=canceled`,
      metadata: {
        appointmentId: appointment.id,
      },
    });

    // 5. Update tabel Appointment dengan Stripe Session ID
    await prisma.appointment.update({
      where: { id: appointment.id },
      data: { stripeSessionId: session.id }
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("STRIPE_CHECKOUT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
