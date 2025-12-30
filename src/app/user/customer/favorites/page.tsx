"use client";
import Card from "@/components/card";
import { RootState } from "@/store/store";
import { ProductsGrid } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/user.styles";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const products = useSelector((state: RootState) => state.products.products);

  const favorites = products?.filter((product) =>
    user?.favorites?.includes(product.id as string)
  );
  return (
    <>
      {favorites.length <= 0 && <h3>You have no favorites</h3>}
      {favorites.length >= 1 && (
        <ProductsGrid>
          {favorites?.map((item, i) => (
            <Card key={i} product={item} />
          ))}
        </ProductsGrid>
      )}
    </>
  );
};

export default Page;
