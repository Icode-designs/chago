"use client";
import Logo from "@/components/logo";
import NavLink from "@/components/userNavlink";
import UserSidebar from "@/components/userSidebar";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import {
  BackBtn,
  UserContent,
  UserContentContainer,
} from "@/styles/components/user.styles";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { FaAngleLeft, FaHeart, FaHistory } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);
  const router = useRouter();
  useEffect(() => {
    if (!navCtx) return;
    if (isLargeScreen) {
      navCtx.openNav();
    }
  }, [navCtx, isLargeScreen]);

  if (!navCtx) return null;

  const { navOpen } = navCtx;

  function handleBack() {
    router.back();
  }

  return (
    <UserContentContainer $navopen={navOpen}>
      <section>
        <UserSidebar navOpen={navOpen}>
          <NavLink href="/user/customer/order-history">
            <FaHistory />
            <p>Order History</p>
          </NavLink>

          <NavLink href="/user/customer/favorites">
            {" "}
            <FaHeart />
            <p>Favorites</p>{" "}
          </NavLink>

          <NavLink href="/user/customer/edit-profile">
            <IoIosSettings />
            <p>Edit Profile</p>
          </NavLink>
        </UserSidebar>
      </section>
      <section>
        <header>
          <Logo variant="black" />
        </header>

        <UserContent>
          <BackBtn onClick={handleBack}>
            <FaAngleLeft /> <p>Back</p>
          </BackBtn>
          {children}
        </UserContent>
      </section>
    </UserContentContainer>
  );
};

export default CustomerLayout;
