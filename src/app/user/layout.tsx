import MobileNav from "@/components/mobileNav";
import UserLayoutWrapper from "@/components/userLayoutWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/login?from=/user");
  }

  // if (session) {
  //   redirect("/user/order-history");
  // }
  return (
    <>
      <UserLayoutWrapper>{children}</UserLayoutWrapper>
      <MobileNav />
    </>
  );
}
