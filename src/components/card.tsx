"use client";
import { updateUserDocument } from "@/lib/services/userService";
import { addToCart, CartItem } from "@/store/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { CustomButton, ProductCard } from "@/styles/components/ui.Styles";
import { Product } from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import { extractRating, numberToStars, Reviews } from "@/utils/ratings";
import { trimText } from "@/utils/trimText";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface CardProps {
  children?: React.ReactNode;
  variant?: string;
  key?: string | number;
  product?: Product;
}

const Card: React.FC<CardProps> = ({ children, variant, product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Derive favorite status from Redux store instead of local state
  const isFavourite = useMemo(
    () => user?.favorites?.includes(product?.id as string) ?? false,
    [user?.favorites, product?.id]
  );

  function toggleFavourite() {
    if (isFavourite) {
      dispatch(removeFromFavorites(product?.id as string));
    } else {
      dispatch(addToFavorites(product?.id as string));
    }
  }

  // Sync favorites to database when they change
  useEffect(() => {
    if (user?.favorites) {
      updateUserDocument(user.uid, {
        favorites: user.favorites,
      });
    }
  }, [user?.favorites, user?.uid]);

  const handleAddToCart = ({
    title,
    id,
    price,
    url,
    vendorId,
  }: Omit<CartItem, "quantity">) => {
    dispatch(addToCart({ title, id, url, price, quantity: 1, vendorId }));
  };

  if (!product && variant !== "categories") return null;

  const rating = extractRating(product as Product);

  return (
    <ProductCard $variant={variant}>
      {variant !== "categories" && (
        <>
          <button onClick={toggleFavourite} className="favourite">
            {!isFavourite ? (
              <IoMdHeartEmpty color="red" />
            ) : (
              <IoMdHeart color="red" />
            )}
          </button>
          <Link href={`/products/product-details/${product?.id}`}>
            <Image
              width={500}
              height={500}
              src={product?.images[0] as string}
              alt={product?.title as string}
              loading="lazy"
            />
            <article>
              <p>{trimText(product?.title as string)}</p>
              <p>{numberToStars(rating as Reviews)}</p>
              <h3>{formatToNaira(Number(product?.price))}</h3>
            </article>
          </Link>
          <CustomButton
            onClick={() =>
              handleAddToCart({
                title: product?.title as string,
                id: product?.id as string,
                price: Number(product?.price),
                url: product?.images[0] as string,
                vendorId: product?.sellerId as string,
              })
            }
            $variant="extended"
          >
            Add to cart
          </CustomButton>
        </>
      )}

      {children}
    </ProductCard>
  );
};

export default Card;
