"use client";
import { FlexBox } from "@/styles/components/ui.Styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={active ? "active" : ""}>
      <FlexBox $gap={10}>{children}</FlexBox>
    </Link>
  );
}
