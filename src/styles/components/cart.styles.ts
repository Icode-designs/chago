import pxTorem from "@/utils/pxToRem";
import styled from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledCartCard = styled.div`
  border-radius: ${pxTorem(12)};
  background-color: var(--col-100);
  display: flex;
  padding: ${pxTorem(16)};
  gap: ${pxTorem(20)};

  > div:nth-of-type(1) {
    height: ${pxTorem(140)};
    width: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  > div:nth-of-type(2) {
    display: grid;
    align-content: stretch;
    > div {
      align-self: start;
      gap: ${pxTorem(10)};
    }
  }
`;

export const StyledCardList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxTorem(16)};
  height: fit-content;
`;

export const StyledOrderSum = styled.div`
  border-radius: ${pxTorem(12)};
  background-color: var(--col-100);
  display: grid;
  padding: ${pxTorem(16)};
  gap: ${pxTorem(20)};
  height: fit-content;
  > div {
    &:nth-of-type(1) {
      border-bottom: solid 1px var(--col-000);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-self: center;

      padding-bottom: ${pxTorem(16)};
    }
  }
`;

export const StyledCartWrapper = styled.div`
  display: grid;
  gap: ${pxTorem(50)};
  padding: ${pxTorem(16)};
  grid-template-columns: 1fr;
  height: fit-content;

  > div {
    display: grid;
    gap: ${pxTorem(32)};
    align-content: start;
  }
  @media ${QUERY.DESKTOP} {
    display: flex;
    gap: ${pxTorem(50)};
    justify-content: space-between;
    > * {
      flex: 1;
    }
  }
`;
