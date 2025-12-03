"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import NewsLetter from "@/components/NewsLetter";
import FilterContextProvider from "@/providers/filterProvider";
import useFetchProducts from "@/hooks/useFetchProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState, useRef } from "react";
import { AddedToCartBox } from "@/styles/components/ui.Styles";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useFetchProducts();

  if (loading) return <p>please wait loading products...</p>;

  return (
    <>
      <Header />
      <FilterContextProvider>{children}</FilterContextProvider>
      <NewsLetter />
      <Footer />
      <MobileNav />
    </>
  );
}
