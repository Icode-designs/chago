"use client";
import pxTorem from "@/utils/pxToRem";
import styled from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledSideBar = styled.div<{ $navOpen: boolean }>`
  position: fixed;
  background-color: var(--col-000);
  height: ${({ $navOpen }) => ($navOpen ? pxTorem(300) : pxTorem(55))};
  width: ${({ $navOpen }) => ($navOpen ? pxTorem(250) : pxTorem(40))};
  margin-top: ${pxTorem(82)};
  display: grid;
  padding: ${pxTorem(16)};
  right: 0;
  top: 0;
  z-index: 10;
  border-radius: ${pxTorem(24)} 0 0 ${pxTorem(24)};
  transition: all ease 0.5s;

  > button {
    align-self: start;
    justify-self: start !important;

    svg {
      color: var(--col-100);
      font-size: ${pxTorem(24)};
    }
  }

  @media ${QUERY.TABLET} {
    margin-top: ${pxTorem(112)};
  }

  @media ${QUERY.DESKTOP} {
    position: sticky;
    top: 0;
    left: 0;
    width: 30%;
    height: calc(100vh - ${pxTorem(110)});
    overflow-y: auto;
    border-radius: 0;
    margin: 0;

    > button {
      display: none;
    }
  }
`;

export const LinksList = styled.ul<{ $show: boolean }>`
  display: grid;
  gap: ${pxTorem(16)};
  text-align: center;
  width: fit-content;
  align-self: start;
  justify-self: center;
  justify-items: center;
  overflow: hidden;
  height: ${({ $show }) => ($show ? pxTorem(202) : 0)};
  overflow: hidden;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: ${({ $show }) => ($show ? "all ease 0.8s" : "all ease 0.3s")};

  > button {
    color: var(--col-300);
    font-size: ${pxTorem(20)};
  }

  li {
    font-weight: 600;
    color: var(--col-100);
    font-size: ${pxTorem(20)};

    a {
      color: var(--col-100);
      transition: color ease 0.3s;
      &.active {
        color: var(--col-200);
      }
    }
  }

  @media ${QUERY.DESKTOP} {
    padding-right: ${pxTorem(70)};
    align-self: center;
    text-align: right;
    justify-self: flex-end;
  }
`;

export const UserContainer = styled.main`
  position: relative;
  display: flex;
  align-items: start;
  gap: 0;
  margin-top: ${pxTorem(82)};
  max-height: 100vh;
  overflow-y: hidden;

  @media ${QUERY.TABLET} {
    margin-top: ${pxTorem(115)};
  }
`;

export const UserContent = styled.div`
  width: 100%;
  padding: ${pxTorem(40)} ${pxTorem(24)} ${pxTorem(90)};
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${QUERY.DESKTOP} {
    padding: ${pxTorem(40)};
  }
`;

export const UserContentContainer = styled.section`
  width: 100%;
  max-height: calc(100vh - ${pxTorem(81)});
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 1024px;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  @media ${QUERY.DESKTOP} {
    max-height: calc(100vh - ${pxTorem(112)});
  }
`;

export const UserOrderList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxTorem(16)};
  width: 100%;
`;

export const StyledOrderCard = styled.li`
  display: grid;
  grid-template-areas: "id title title" "price qty status";
  background-color: var(--col-100);
  border-radius: var(--border-radius);
  padding: ${pxTorem(18)};
  width: 100%;
  gap: ${pxTorem(24)};

  h3 {
    grid-area: id;
    justify-self: start;
    align-self: start;
  }

  p {
    &:nth-of-type(1) {
      grid-area: title;
      justify-self: end;
      align-self: start;
    }
    &:nth-of-type(2) {
      grid-area: price;
      justify-self: start;
      align-self: end;
    }
    &:nth-of-type(3) {
      grid-area: qty;
      justify-self: center;
      align-self: end;
    }
  }

  .status {
    grid-area: status;
    justify-self: end;
    align-self: end;
    padding: ${pxTorem(10)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    text-transform: capitalize;

    &.pending {
      background-color: #ffbe86ff;
      color: orange;
    }

    &.transit {
      background-color: #87cefa;
      color: #00b7ffff;
    }

    &.recieved {
      background-color: #90ee90;
      color: #00ff00;
    }
    &.canceled {
      background-color: #ff4c4cff;
      color: var(--col-300);
    }
  }

  @media ${QUERY.TABLET} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .status,
    h3 {
      justify-self: unset;
      align-self: unset;
    }

    p {
      &:nth-of-type(1) {
        justify-self: unset;
        align-self: unset;
      }
      &:nth-of-type(2) {
        justify-self: unset;
        align-self: unset;
      }
      &:nth-of-type(3) {
        justify-self: unset;
        align-self: unset;
      }
    }
  }
`;
