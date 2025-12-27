import { Order } from "@/utils/orderHelpers";
import React from "react";
import OrderItemCard from "./orderItemCard";
import { UserOrderList } from "@/styles/components/user.styles";
import { GridColumn } from "@/styles/components/ui.Styles";

interface Props {
  order: Order;
}

const OrderDisplay = ({ order }: Props) => {
  const orderCreationTime = new Date(order.createdAt).toLocaleDateString();

  return (
    <UserOrderList>
      <GridColumn>
        <h3>Order ref: {order.orderId} </h3>
        <p>created on: {orderCreationTime}</p>
      </GridColumn>

      {order.items.map((item, i) => (
        <OrderItemCard item={item} key={i} />
      ))}
    </UserOrderList>
  );
};

export default OrderDisplay;
