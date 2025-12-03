"use client";
import OrderDisplay from "@/components/OrderDisplay";
import { useOrders } from "@/hooks/useOrders";
import { GridColumn } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import React from "react";

const Page = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <p>loading your orders</p>;
  if (error) return <p>there was an error loading your orders</p>;
  return (
    <UserContent>
      <GridColumn $gap={50}>
        {orders
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((order, i) => (
            <OrderDisplay order={order} key={i} />
          ))}
      </GridColumn>
    </UserContent>
  );
};

export default Page;
