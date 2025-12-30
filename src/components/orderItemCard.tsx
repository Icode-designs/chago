import { StyledOrderCard } from "@/styles/components/user.styles";
import formatToNaira from "@/utils/formatPrice";
import { OrderItem } from "@/utils/orderHelpers";
import { trimText } from "@/utils/trimText";
import React from "react";
import { GoDotFill } from "react-icons/go";

interface Props {
  item: OrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  const statusClassMap: Record<string, string> = {
    pending: "pending",
    recieved: "recieved",
    cancelled: "cancelled",
    "in transit": "transit",
  };
  return (
    <StyledOrderCard>
      <h3>{trimText(item.id as string, 10)}</h3>
      <p>{trimText(item.title as string, 10)}</p>

      <p>{formatToNaira(Number(item.price))}</p>
      <p>X{item.quantity}</p>
      <div className={`status ${statusClassMap[item.status] || "unknown"}`}>
        <GoDotFill />
        <div className={`status ${item.status}`}>
          <p>{item.status}</p>
        </div>
      </div>
    </StyledOrderCard>
  );
};

export default OrderItemCard;
