import { ReactNode } from "react";
import { NavContextProvider } from "@/providers/NavProvider";

export default function UserLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <NavContextProvider>{children}</NavContextProvider>;
}
