"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import {
  BackBtn,
  NavigationBox,
  StyledSideBar,
} from "@/styles/components/user.styles";
import React, { useContext, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa";
import { handleLogoutAction } from "@/app/user/actions";
import { logoutUser } from "@/utils/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { IoClose } from "react-icons/io5";

const UserSidebar = ({
  children,
  navOpen,
}: {
  children: React.ReactNode;
  navOpen: boolean;
}) => {
  const router = useRouter();
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!navCtx) return;
    if (isLargeScreen) {
      navCtx.openNav();
    }
  }, [navCtx, isLargeScreen]);

  if (!navCtx) return null;

  const { toggleNav } = navCtx;

  async function handleLogout() {
    try {
      // Delete session cookie on server
      await handleLogoutAction();

      // Log out from Firebase
      await logoutUser();

      // Redirect to home
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <StyledSideBar $navOpen={navOpen}>
      <button onClick={toggleNav}>
        {navOpen ? (
          <>
            {" "}
            <IoClose />
          </>
        ) : (
          <FaBars />
        )}
      </button>
      <div>
        <h3>
          Welcome {user?.role} {user?.firstName}
        </h3>
      </div>

      <NavigationBox $show={navOpen}>{children}</NavigationBox>

      <button onClick={handleLogout}>
        <FlexBox $gap={8}>
          <FaPowerOff />
          <h3>Logout</h3>
        </FlexBox>
      </button>
    </StyledSideBar>
  );
};

export default UserSidebar;
