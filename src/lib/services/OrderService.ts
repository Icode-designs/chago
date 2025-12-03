import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseCl";
import { cleanData } from "@/utils/fetchAllProducts";

export const fetchOrder = async (uid: string) => {
  try {
    const ref = query(collection(db, "orders"), where("customerId", "==", uid));
    const snap = await getDocs(ref);

    const orders = snap.docs.map((doc) => {
      const rawData = doc.data();

      return {
        id: doc.id,
        ...cleanData(rawData),
      };
    });
    return orders;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
