"use client";
import Header from "@/components/customHeader";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobileNav";
import NewsLetter from "@/components/newsLetter";
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
