import { FlexBox } from "@/styles/components/ui.Styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

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
      <FlexBox $gap={10}>
        {children === "Order History" ? (
          <FaHistory />
        ) : children === "Edit Profile" ? (
          <IoIosSettings />
        ) : children === "Favorites" ? (
          <FaHeart />
        ) : (
          ""
        )}

        {children}
      </FlexBox>
    </Link>
  );
}
