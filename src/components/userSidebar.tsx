"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { NavigationBox, StyledSideBar } from "@/styles/components/User.styles";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { handleLogoutAction } from "@/app/user/actions";
import { logoutUser } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import NavLink from "./userNavlink";

const UserSidebar = () => {
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

  const { toggleNav, navOpen } = navCtx;

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
        {navOpen ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      <div>
        <h3>Welcome user {user?.firstName}</h3>
      </div>
      <NavigationBox $show={navOpen}>
        <NavLink href="/user/edit-profile">Edit Profile</NavLink>

        <NavLink href="/user/order-history">Order History</NavLink>

        <NavLink href="/user/favorites">Favorites</NavLink>
      </NavigationBox>
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
