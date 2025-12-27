"use client";
import Header from "@/components/customHeader";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import NewsLetter from "@/components/NewsLetter";
import FilterContextProvider from "@/providers/filterProvider";
import useFetchProducts from "@/hooks/useFetchProducts";
import { LoaderBox } from "@/styles/components/ui.Styles";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useFetchProducts();

  if (loading)
    return (
      <LoaderBox>
        <div></div>
      </LoaderBox>
    );

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
