"use client";
import React, { useRef, useState } from "react";
import OrderSummary from "@/components/orderSummary";
import {
  StyledCheckoutField,
  StyledFieldGrid,
} from "@/styles/components/checkout.styles";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import { RootState } from "@/store/store";
import { CartItem, clearCart } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { createOrderWithVendorSplit } from "@/utils/orderHelpers";
import { redirect } from "next/navigation";

// Declare Paystack type for TypeScript
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    PaystackPop: any;
  }
}

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items
  );
  const user = useSelector((state: RootState) => state.user.currentUser);
  const formRef = useRef<HTMLFormElement>(null);

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shiping = 6000 * cartItems.length;
  const tax = subTotal * 0.01;
  const grandTotal = shiping + tax + subTotal;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Get form values
    const phoneNumber = formData.get("phone-number") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const email = formData.get("email") as string;

    // Validate required fields
    if (!phoneNumber || !address || !city || !state || !email) {
      alert("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Generate unique reference
    const reference =
      "ref_" + Date.now() + Math.random().toString(36).substr(2, 9);

    try {
      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: grandTotal * 100,
        currency: "NGN",
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: phoneNumber,
            },
            {
              display_name: "Delivery Address",
              variable_name: "address",
              value: `${address}, ${city}, ${state}`,
            },
          ],
        },
        onClose: function () {
          setLoading(false);
          alert("Payment window closed");
        },
        callback: function (response: any) {
          // Payment successful - verify on backend
          verifyPayment(response.reference, {
            phoneNumber,
            address,
            city,
            state,
            email,
          });
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  }

  async function verifyPayment(
    reference: string,
    orderDetails: {
      phoneNumber: string;
      address: string;
      city: string;
      state: string;
      email: string;
    }
  ) {
    try {
      // Call your backend to verify payment
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference,
          orderDetails,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Payment verified successfully

        // Create order with vendor split
        const orderResult = await createOrderWithVendorSplit(
          reference,
          user,
          orderDetails,
          cartItems
        );

        if (orderResult.success) {
          alert("Payment successful! Your order has been placed.");
          dispatch(clearCart());
          redirect("/user/order-history");
        } else {
          alert(
            `Payment successful (${reference}) but there was an issue saving your order. Please contact support.`
          );
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert(
        "Error verifying payment. Please contact support with reference: " +
          reference
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FlexBox
        $justifyContent="space-between"
        $gap={40}
        $alignItems="start"
        $variant="secondary"
      >
        <StyledFieldGrid $gap={50}>
          <StyledCheckoutField>
            <h2>1. Delivery Address</h2>
            <div>
              <div>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email as string}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label htmlFor="tel">Phone Number *</label>
                <input
                  type="tel"
                  name="phone-number"
                  id="tel"
                  placeholder="Enter phone number"
                  defaultValue={Number(user?.phoneNumber)}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  defaultValue={user?.address?.street}
                  required
                />
              </div>
              <FlexBox $gap={16} $variant="secondary">
                <div>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    defaultValue={user?.address?.city}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                    defaultValue={user?.address?.state}
                    required
                  />
                </div>
              </FlexBox>
            </div>
          </StyledCheckoutField>
        </StyledFieldGrid>
        <StyledFieldGrid $gap={32}>
          <OrderSummary />
          <CustomButton $variant="extended" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order & Pay"}
          </CustomButton>
        </StyledFieldGrid>
      </FlexBox>
    </form>
  );
};

export default CheckoutForm;
