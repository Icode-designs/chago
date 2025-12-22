"use client";
import BestDeal from "@/components/bestDeals";
import Categories from "@/components/categories";
import FlashSale from "@/components/flashSale";
import HomePageHero from "@/components/homePageHero";
import { MainContainer } from "@/styles/components/ui.Styles";

export default function Home() {
  return (
    <MainContainer>
      <HomePageHero />
      <Categories />
      <FlashSale />
      <BestDeal />
    </MainContainer>
  );
}
