// app/api/verify-payment/route.ts

import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { status: "error", message: "No reference provided" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      const paymentData = data.data;

      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data: {
          reference: paymentData.reference,
          amount: paymentData.amount / 100,
          currency: paymentData.currency,
          email: paymentData.customer.email,
          paidAt: paymentData.paid_at,
          channel: paymentData.channel,
        },
      });
    } else {
      return NextResponse.json(
        {
          status: "failed",
          message: data.message || "Payment verification failed",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Server error during payment verification",
      },
      { status: 500 }
    );
  }
}
