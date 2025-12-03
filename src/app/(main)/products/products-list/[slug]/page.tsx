"use client";

import Card from "@/components/Card";
import { FILTER_CONTEXT } from "@/providers/filterProvider";
import { RootState } from "@/store/store";
import { StyledProductsList } from "@/styles/components/productsList";
import {
  FlexBox,
  MainContainer,
  ProductsGrid,
} from "@/styles/components/ui.Styles";
import { extractRating, Reviews, sumRatings } from "@/utils/ratings";
import React, { use, useContext, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();
  const normalizedSlug = slug.replace(/-/g, " ");

  const filterCtx = useContext(FILTER_CONTEXT);
  const products = useSelector((state: RootState) => state.products.products);

  // Reset filters when slug changes
  useEffect(() => {
    filterCtx?.resetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Detect whether slug refers to a product ID or a category
  const { productById, categoryMatch, pageTitle } = useMemo(() => {
    const productById = products.find(
      (product) => product.id?.toLowerCase() === slug
    );

    const categoryMatch = products.filter(
      (product) => product.category.toLowerCase() === normalizedSlug
    );

    let pageTitle = "Products";
    if (productById) {
      pageTitle = `Related to ${productById.title}`;
    } else if (categoryMatch.length > 0) {
      // Capitalize category name
      pageTitle = normalizedSlug
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return { productById, categoryMatch, pageTitle };
  }, [products, slug, normalizedSlug]);

  // 🪄 Get base products based on slug
  const baseProducts = useMemo(() => {
    // Case 1️⃣: Slug matches a product ID
    if (productById) {
      const sameCategory = products.filter(
        (p) => p.category === productById.category && p.id !== productById.id
      );
      const others = products.filter(
        (p) => p.category !== productById.category
      );
      return [productById, ...sameCategory, ...others];
    }

    // Case 2️⃣: Slug matches a category
    if (categoryMatch.length > 0) {
      return categoryMatch;
    }

    // Case 3️⃣: "All products"
    if (normalizedSlug === "all products") {
      return products;
    }

    // Case 4️⃣: No match
    return [];
  }, [products, productById, categoryMatch, normalizedSlug]);

  // Apply filters to base products
  const filteredProducts = useMemo(() => {
    if (!filterCtx) return baseProducts;

    const { filters } = filterCtx;
    let filtered = [...baseProducts];

    // Filter by category
    if (filters.categories.length > 0) {
      filtered = filtered.filter((prod) =>
        filters.categories.includes(prod.category.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(
        (prod) => Number(prod.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (prod) => Number(prod.price) <= Number(filters.maxPrice)
      );
    }

    // Filter by rating
    if (filters.rating.length > 0) {
      filtered = filtered.filter((prod) => {
        const rating = extractRating(prod);
        const prodRating = sumRatings(rating as Reviews);
        if (Number.isNaN(prodRating)) return false;
        return filters.rating.includes(prodRating);
      });
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter((p) =>
        [p.title, p.category, p.description].some((field) =>
          field
            ?.toLowerCase()
            .includes(filters.searchTerm?.toLowerCase() as string)
        )
      );
    }

    return filtered;
  }, [baseProducts, filterCtx]);

  // Show loading if products haven't loaded yet
  if (products.length === 0) {
    return (
      <MainContainer>
        <StyledProductsList>
          <FlexBox>
            <h1>Loading products...</h1>
          </FlexBox>
        </StyledProductsList>
      </MainContainer>
    );
  }

  return (
    <MainContainer $variant="secondary">
      <StyledProductsList>
        <>
          <h1>{pageTitle}</h1>
          {filterCtx?.filters && (
            <p>
              Showing {filteredProducts.length} of {baseProducts.length}{" "}
              products
            </p>
          )}
        </>
        {filteredProducts.length === 0 ? (
          <FlexBox>
            <p>
              {baseProducts.length === 0
                ? `No products found for "${slug}".`
                : "No products match your filters. Try adjusting your criteria."}
            </p>
          </FlexBox>
        ) : (
          <ProductsGrid>
            {filteredProducts.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </ProductsGrid>
        )}
      </StyledProductsList>
    </MainContainer>
  );
};

export default Page;
