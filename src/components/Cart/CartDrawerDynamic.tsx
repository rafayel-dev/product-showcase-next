"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/Cart/CartDrawer"), {
    ssr: false,
});

export default function CartDrawerDynamic() {
    return <CartDrawer />;
}
