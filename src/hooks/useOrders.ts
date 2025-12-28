import { fetchOrder } from "@/lib/services/orderService";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useOrders = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getOrders() {
      setLoading(true);
      try {
        if (!user?.uid) return;

        const userOrders = await fetchOrder(user.uid);
        setOrders(userOrders);
        setLoading(false);
      } catch (err) {
        throw err;
        setError(true);
        setLoading(false);
      }
    }

    getOrders();
  }, [user?.uid]); // run whenever user changes

  return { orders, error, loading };
};
