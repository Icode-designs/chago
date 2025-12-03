"use client";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import React from "react";
import Card from "./Card";
import PRODUCT from "@/types/productsType";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PROPS {
  product: PRODUCT;
}

const RelatedProducts = ({ product }: PROPS) => {
  const products = useSelector((state: RootState) => state.products.products);

  if (!products) {
    return null;
  }
  const relatedProducts = products?.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <ProductSection>
      <div>Related products</div>
      <ProductsGrid>
        {relatedProducts?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default RelatedProducts;
