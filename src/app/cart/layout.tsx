import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

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
