import type { Metadata } from "next";
import OrderSuccessClient from "./OrderSuccessClient";

export const metadata: Metadata = {
    title: "Order Successful",
    description: "Your order has been placed successfully. Thank you for shopping with us!",
};

export default function OrderSuccessPage() {
    return <OrderSuccessClient />;
}
