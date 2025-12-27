"use client";
import {
  StyledFilter,
  StyledFilterForm,
  StyledFormField,
} from "@/styles/components/productsList";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import React, { useContext, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { FILTER_CONTEXT } from "@/providers/filterProvider";

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const filterCtx = useContext(FILTER_CONTEXT);

  function toggleFilter() {
    setOpenFilter((prev) => !prev);
  }

  if (!filterCtx) return null;
  const { handleSubmit } = filterCtx;

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await handleSubmit(formData);
    toggleFilter();
  }

  return (
    <StyledFilter $isOpen={openFilter}>
      <FlexBox $justifyContent="space-between" $gap={24}>
        {/* AnimatePresence must always be mounted */}
        <AnimatePresence mode="wait">
          {openFilter && (
            <motion.h2
              key="filter-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Filter
            </motion.h2>
          )}
        </AnimatePresence>

        <button onClick={toggleFilter}>
          {openFilter ? <IoClose /> : <FaFilter />}
        </button>
      </FlexBox>
      {openFilter && (
        <StyledFilterForm onSubmit={handleFormSubmit}>
          <StyledFormField>
            <label htmlFor="priceRange">Price Range</label>
            <div>
              <FlexBox $justifyContent="space-between" $gap={40}>
                <input
                  type="number"
                  id="priceRange"
                  name="min"
                  placeholder="min"
                />
                <input
                  type="number"
                  id="priceRange"
                  name="max"
                  placeholder="max"
                />
              </FlexBox>
            </div>
          </StyledFormField>
          <StyledFormField>
            <label htmlFor="stars">Rating</label>
            <FlexBox $gap={16}>
              <input type="checkbox" name="stars" value={5} id="stars" />{" "}
              <span>
                <p>5 stars</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input type="checkbox" name="stars" value={4} id="stars" />{" "}
              <span>
                <p>4 stars</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input type="checkbox" name="stars" value={3} id="stars" />{" "}
              <span>
                <p>3 stars</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input type="checkbox" name="stars" value={2} id="stars" />{" "}
              <span>
                <p>2 stars</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input type="checkbox" name="stars" value={1} id="stars" />{" "}
              <span>
                <p>1 star</p>
              </span>
            </FlexBox>
          </StyledFormField>
          <StyledFormField>
            <label htmlFor="categories">Categories</label>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="home appliances"
                id="categories"
              />{" "}
              <span>
                <p>Home Appliance</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="smart watches"
                id="categories"
              />{" "}
              <span>
                <p>Smart Watches</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="phones"
                id="categories"
              />{" "}
              <span>
                <p>Phones</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="laptops"
                id="categories"
              />{" "}
              <span>
                <p>Laptops</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="tablets"
                id="categories"
              />{" "}
              <span>
                <p>Tablets</p>
              </span>
            </FlexBox>
            <FlexBox $gap={16}>
              <input
                type="checkbox"
                name="categories"
                value="bikes"
                id="categories"
              />{" "}
              <span>
                <p>Bikes</p>
              </span>
            </FlexBox>
          </StyledFormField>
          <CustomButton>Apply</CustomButton>
        </StyledFilterForm>
      )}
    </StyledFilter>
  );
};

export default Filter;
