import { LogoBox } from "@/styles/components/ui.Styles";
import Link from "next/link";
import React from "react";
import black from "@/assets/logoBleck.png";
import white from "@/assets/logoWhite.png";
import Image from "next/image";

interface Props {
  variant: "black" | "white";
}

const Logo = ({ variant }: Props) => {
  return (
    <Link href="/">
      <LogoBox $variant={variant}>
        <Image
          width={500}
          height={500}
          src={variant === "white" ? white.src : black.src}
          alt="logo"
        />
      </LogoBox>
    </Link>
  );
};

export default Logo;
