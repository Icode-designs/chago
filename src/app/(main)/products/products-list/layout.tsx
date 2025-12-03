"use client";
import Filter from "@/components/Filter";
import React, { ReactNode } from "react";

interface PROPS {
  children: ReactNode;
}

const layout = ({ children }: PROPS) => {
  return (
    <>
      <Filter />
      {children}
    </>
  );
};

export default layout;
