import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { fetchProducts } from "@/utils/fetchAllProducts";

export default async function cartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <MobileNav />
    </>
  );
}
