import Header from "@/components/customHeader";
import MobileNav from "@/components/mobileNav";

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
