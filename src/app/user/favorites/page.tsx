"use client";
import Card from "@/components/Card";
import { RootState } from "@/store/store";
import { ProductsGrid } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const products = useSelector((state: RootState) => state.products.products);

  const favorites = products?.filter((product) =>
    user?.favorites?.includes(product.id as string)
  );
  return (
    <UserContent>
      <ProductsGrid>
        {favorites?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </UserContent>
  );
};

export default Page;
