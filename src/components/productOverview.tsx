"use client";
import { addToCart, CartItem } from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store/store";
import {
  ProductImgBox,
  ProductInfoBox,
  ProductOverviewBox,
} from "@/styles/components/productDetails";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import {
  extractRating,
  numberToStars,
  Reviews,
  sumRatings,
} from "@/utils/ratings";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  product: Product;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductOverview = ({ product, activeImage, setActiveImage }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = ({
    title,
    id,
    price,
    url,
    vendorId,
  }: Omit<CartItem, "quantity">) => {
    dispatch(addToCart({ title, url, id, price, quantity: 1, vendorId }));
  };

  const rating = extractRating(product as Product);
  return (
    <ProductOverviewBox>
      <FlexBox $gap={50} $variant="secondary">
        <ProductImgBox>
          <FlexBox $gap={16} $variant="secondary">
            <div>
              {product.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={i === activeImage ? "active" : ""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={image}
                    alt={product.title}
                  />
                </div>
              ))}
            </div>
            <Image
              width={500}
              height={500}
              src={product.images[activeImage]}
              alt={product.title}
            />
          </FlexBox>
        </ProductImgBox>

        <ProductInfoBox>
          <h1>{product.title}</h1>
          <p>{formatToNaira(Number(product.price))}</p>
          <FlexBox $gap={10} $justifyContent="center">
            <FlexBox $justifyContent="right">
              {numberToStars(rating as Reviews)}
            </FlexBox>
            <p>{sumRatings(rating as Reviews)} reviews</p>
          </FlexBox>
          <p>Amount in stock: {product.productStock}</p>
          <FlexBox $gap={16} $width="100%">
            <CustomButton
              $variant="extended"
              onClick={() =>
                handleAddToCart({
                  title: product.title,
                  id: product.id as string,
                  price: Number(product.price),
                  url: product.images[0],
                  vendorId: product.sellerId,
                })
              }
            >
              Add to cart
            </CustomButton>
            <CustomButton $variant="extended">Buy now</CustomButton>
          </FlexBox>
        </ProductInfoBox>
      </FlexBox>
    </ProductOverviewBox>
  );
};

export default ProductOverview;
