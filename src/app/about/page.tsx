import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Product Showcase - your trusted destination for premium products with fast delivery across Bangladesh.",
    openGraph: {
        title: "About Us - Product Showcase",
        description: "Your trusted destination for premium products with fast delivery.",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
