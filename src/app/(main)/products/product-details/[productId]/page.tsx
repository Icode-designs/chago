"use client";
import ProductDetails from "@/components/productDetails";
import ProductOverview from "@/components/productOverview";
import ProductReviews from "@/components/productReviews";
import RelatedProducts from "@/components/relatedProducts";
import UserReview, { ReviewData } from "@/components/userReview";
import { LoaderBox, MainContainer } from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React, { use, useState } from "react";

const Page = ({ params }: { params: Promise<{ productId: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.productId;
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProduct: Product | undefined = products.find(
    (prod) => prod.id === id
  );
  const [activeImage, setActiveImage] = useState(0);

  if (!selectedProduct)
    return (
      <LoaderBox>
        <p>Product not found.</p>
      </LoaderBox>
    );
  return (
    <MainContainer $variant="secondary">
      <ProductOverview
        product={selectedProduct}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
      <ProductDetails product={selectedProduct} />
      <ProductReviews
        reviews={selectedProduct.customerReviews as ReviewData[]}
      />
      <UserReview productId={selectedProduct.id as string} />
      <RelatedProducts product={selectedProduct} />
    </MainContainer>
  );
};

export default Page;
