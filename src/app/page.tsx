import { getProducts } from "@/lib/products/productsApi";
import { getSliders } from "@/lib/sliders/slidersApi";
import { getCategories } from "@/lib/categories/categoriesApi";
import { defaultSlides } from "@/data";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover our new arrivals and best selling products. Shop premium quality items with fast delivery.",
  openGraph: {
    title: "Product Showcase - Home",
    description: "Discover our new arrivals and best selling products.",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Server-side data fetching
  const [products, sliders, categories] = await Promise.all([
    getProducts(),
    getSliders(),
    getCategories(),
  ]);

  const slidersToUse = sliders.length > 0 ? sliders : defaultSlides;

  return (
    <HomeClient
      initialProducts={products}
      initialSliders={slidersToUse}
      categories={categories}
    />
  );
}
