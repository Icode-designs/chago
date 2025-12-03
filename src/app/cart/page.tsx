"use client";
"@/store/store";
import CartItemList from "@/components/CartItemList";
import OrderSummary from "@/components/OrderSummary";
import { CartItem } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { StyledCartWrapper } from "@/styles/components/cart.styles";
import { MainContainer, CustomLink } from "@/styles/components/ui.Styles";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items
  );
  return (
    <MainContainer>
      <StyledCartWrapper>
        <CartItemList />
        <div>
          <OrderSummary />
          <CustomLink
            href={cartItems.length <= 0 ? "" : "/checkout"}
            $variant="extended"
          >
            Check Out
          </CustomLink>
        </div>
      </StyledCartWrapper>
    </MainContainer>
  );
};

export default Page;
