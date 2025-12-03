import { StyledMobileNav } from "@/styles/components/mobileNav.style";
import Link from "next/link";
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa";

import Cart from "./Cart";
import { CiHome, CiShop, CiUser } from "react-icons/ci";

const MobileNav = () => {
  return (
    <StyledMobileNav>
      <ul>
        <li>
          <Link href="/">
            <CiHome />
          </Link>
        </li>
        <li>
          <Cart />
        </li>
        <li>
          <Link href={`/products/products-list/${"all-products"}`}>
            <CiShop />
          </Link>
        </li>
        <li>
          <Link href="/user">
            <CiUser />
          </Link>
        </li>
      </ul>
    </StyledMobileNav>
  );
};

export default MobileNav;
