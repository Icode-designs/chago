import { db } from "@/lib/firebaseCl";
import { CartItem } from "@/store/slices/cartSlice";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export interface OrderItem {
  id: string;
  vendorId: string;
  title: string;
  price: number;
  quantity: number;
  status: "pending" | "in transit" | "recieved";
}

export interface Order {
  orderId: string;
  customerName: string;
  customerId: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  email: string;
  items: OrderItem[];
  createdAt: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// Group cart items by vendor
function groupItemsByVendor(cartItems: CartItem[]): Record<string, CartItem[]> {
  return cartItems.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = [];
    }
    acc[item.vendorId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);
}

export async function createOrderWithVendorSplit(
  reference: string,
  user: any,
  orderDetails: any,
  cartItems: CartItem[]
) {
  try {
    // Step 1: Create main order document
    const order = {
      orderId: reference,
      customerName: user?.firstName + " " + user?.lastName,
      customerId: user?.uid,
      ...orderDetails,
      items: cartItems.map(({ id, vendorId, quantity, price, title }) => ({
        id,
        vendorId,
        quantity,
        price,
        title,
        status: "pending",
      })),
      vendorIds: [...new Set(cartItems.map((item) => item.vendorId))],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const orderRef = doc(db, "orders", reference);
    await setDoc(orderRef, order);

    console.log("Main order created:", reference);

    // Step 2: Group items by vendor
    const vendorItemsMap = groupItemsByVendor(cartItems);

    // Step 3: Create vendor-specific subcollections
    const vendorPromises = Object.entries(vendorItemsMap).map(
      async ([vendorId, items]) => {
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return setDoc(doc(db, `orders/${reference}/vendorItems/${vendorId}`), {
          vendorId,
          items,
          subtotal,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          orderStatus: "pending",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    );

    await Promise.all(vendorPromises);

    console.log("Vendor subcollections created successfully");

    return {
      success: true,
      orderId: reference,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error,
    };
  }
}
