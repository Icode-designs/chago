"use client";
import OrderDisplay from "@/components/orderDisplay";
import { useOrders } from "@/hooks/useOrders";
import { GridColumn, LoaderBox } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/user.styles";
import React from "react";

const Page = () => {
  const { orders, loading, error } = useOrders();

  if (loading)
    return (
      <LoaderBox>
        <div></div>
      </LoaderBox>
    );
  if (error)
    return (
      <UserContent>
        <LoaderBox>
          {" "}
          <p>there was an error loading your orders</p>
        </LoaderBox>
      </UserContent>
    );
  return (
    <UserContent>
      {orders.length <= 0 && <h3>You havent placed an order yet</h3>}
      {orders.length >= 1 && (
        <GridColumn $gap={50}>
          {orders
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((order, i) => (
              <OrderDisplay order={order} key={i} />
            ))}
        </GridColumn>
      )}
    </UserContent>
  );
};

export default Page;
