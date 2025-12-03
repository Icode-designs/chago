"use client";
import pxTorem from "@/utils/pxToRem";
import styled from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledMobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${pxTorem(16)};
  background-color: var(--col-100);
  ul {
    display: flex;
    justify-content: space-between;
    gap: ${pxTorem(16)};
    li {
      a {
        display: grid;
        justify-items: center;
        width: fit-content;
        gap: ${pxTorem(8)};

        svg {
          font-size: ${pxTorem(35)};
        }
      }
    }
  }

  @media ${QUERY.TABLET} {
    display: none;
  }
`;
