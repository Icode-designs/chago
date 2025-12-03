"use client";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const BestDeal = () => {
  const products = useSelector((state: RootState) => state.products.products);

  if (!products) {
    return null;
  }

  return (
    <ProductSection $variant={undefined}>
      <div>
        <h2>Best Deals</h2>
        <span>
          <p></p>
        </span>
      </div>
      <ProductsGrid>
        {products?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default BestDeal;
