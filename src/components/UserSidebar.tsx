"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { LinksList, StyledSideBar } from "@/styles/components/User.styles";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { handleLogoutAction } from "@/app/user/actions";
import { logoutUser } from "@/utils/auth";
import { clearCart } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import NavLink from "./UserNavlink";

const UserSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);

  const formattedPath = pathname.replace("/-/", " ");

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

      // Clear cart state
      dispatch(clearCart());

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <StyledSideBar $navOpen={navOpen}>
      <button onClick={toggleNav}>
        {navOpen ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      {navOpen && (
        <LinksList>
          <li>
            <NavLink href="/user/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink href="/user/track-order">Track order</NavLink>
          </li>
          <li>
            <NavLink href="/user/order-history">Order History</NavLink>
          </li>
          <li>
            <NavLink href="/user/favorites">Favorites</NavLink>
          </li>

          <button onClick={handleLogout}>
            <FlexBox $gap={8}>
              <FaPowerOff />
              <h3>Logout</h3>
            </FlexBox>
          </button>
        </LinksList>
      )}
    </StyledSideBar>
  );
};

export default UserSidebar;
