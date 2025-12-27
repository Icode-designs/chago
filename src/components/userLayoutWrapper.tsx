import { ReactNode } from "react";
import UserSidebar from "./userSidebar";
import { NavContextProvider } from "@/providers/NavProvider";
import { UserContainer } from "@/styles/components/user.styles";

export default function UserLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UserContainer>
      <NavContextProvider>
        <UserSidebar />
        {children}
      </NavContextProvider>
    </UserContainer>
  );
}
