import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { getSettings } from "@/lib/settings/settingsApi";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Product Showcase - your trusted destination for premium products with fast delivery across Bangladesh.",
    openGraph: {
        title: "About Us - Product Showcase",
        description: "Your trusted destination for premium products with fast delivery.",
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AboutPage() {
    const data = await getSettings("about");
    return <AboutClient initialData={data} />;
}
