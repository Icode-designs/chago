import { db } from "@/lib/firebaseCl";
import { Product } from "@/types/productsType";
import { collection, getDocs, Timestamp } from "firebase/firestore";

// Helper: convert Firestore Timestamp → millis OR recursively clean object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanData(obj: any): any {
  // Check if it's a Firestore Timestamp
  if (obj instanceof Timestamp) {
    return obj.toMillis();
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(cleanData);
  }

  // Handle objects
  if (obj !== null && typeof obj === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plain: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        plain[key] = cleanData(obj[key]);
      }
    }
    return plain;
  }

  return obj; // primitive values
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const productsCollectionRef = collection(db, "products");
    const snap = await getDocs(productsCollectionRef);

    const products = snap.docs.map((doc) => {
      const rawData = doc.data();

      return {
        id: doc.id,
        ...cleanData(rawData),
      } as Product;
    });

    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}
