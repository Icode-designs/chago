import Footer from "@/components/footer";
import Header from "@/components/customHeader";
import MobileNav from "@/components/mobileNav";
import { fetchProducts } from "@/utils/fetchAllProducts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function checkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect(`/login?from=/checkout`);
  }
  return (
    <>
      <Header />
      {children}
      <MobileNav />
      <Footer />
    </>
  );
}
