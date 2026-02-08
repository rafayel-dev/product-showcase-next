import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your purchase securely with Cash on Delivery or mobile payment options.",
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
