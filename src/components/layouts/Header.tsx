"use client";

import { useState, useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Badge } from "antd";
import { getMarquee, MarqueeData } from "@/lib/promotion/promotionApi";

const Header = () => {
    const { openCart, cartItems } = useCart();
    const [marquee, setMarquee] = useState<MarqueeData>({ text: "", isActive: true });

    const totalItems = cartItems.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMarquee();
            setMarquee(data);
        };
        fetchData();
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            {marquee.isActive && marquee.text && (
                <div className="bg-gradient-to-r from-violet-600 to-red-500 text-white py-1 overflow-hidden relative">
                    <div className="animate-marquee whitespace-nowrap flex gap-10">
                        <span className="mx-2 font-medium text-sm">{marquee.text}</span>
                    </div>
                    <style jsx>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-100%); }
                        }
                        .animate-marquee {
                            display: inline-block;
                            padding-left: 100%;
                            animation: marquee 30s linear infinite;
                        }
                    `}</style>
                </div>
            )}
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
