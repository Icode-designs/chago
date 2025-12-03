"use client";
import ProductDetails from "@/components/ProductDetails";
import ProductOverview from "@/components/ProductOverview";
import ProductReviews from "@/components/ProductReviews";
import RelatedProducts from "@/components/RelatedProducts";
import UserReview, { ReviewData } from "@/components/UserReview";
import { MainContainer } from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import React, { use, useState } from "react";

interface STATETYPE {
  error: null | string;
  loading: boolean;
}

const Page = ({ params }: { params: Promise<{ productId: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.productId;
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProduct: Product | undefined = products.find(
    (prod) => prod.id === id
  );
  const [activeImage, setActiveImage] = useState(0);
  const [productState, setProductState] = useState<STATETYPE>({
    error: null,
    loading: false,
  });

  if (productState.error) return <p>An error occurred: {productState.error}</p>;
  if (productState.loading) return <p>Loading product data...</p>;
  if (!selectedProduct) return <p>Product not found.</p>;
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
