"use client";

import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Badge } from "antd";

const Header = () => {
    const { openCart, cartItems } = useCart();
    const totalItems = cartItems.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
    );

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                </Link>
                <div className="flex! items-center!">
                    <Badge count={totalItems} color="purple" showZero>
                        <BsCart3
                            className="h-6! w-6! text-gray-700! hover:text-gray-900! cursor-pointer"
                            onClick={openCart}
                        />
                    </Badge>
                </div>
            </div>
        </header>
    );
};

export default Header;
