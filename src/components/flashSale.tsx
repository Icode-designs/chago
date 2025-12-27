"use client";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import Card from "./card";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const FlashSale = () => {
  const products = useSelector((state: RootState) => state.products.products);

  if (!products) {
    return null;
  }

  const saleProducts = products?.filter((product, i) => i <= 7);

  return (
    <ProductSection $variant="flash-sale">
      <div>
        <h2>Flash Sale</h2>
        <span>
          <p></p>
        </span>
      </div>
      <ProductsGrid>
        {saleProducts?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default FlashSale;
