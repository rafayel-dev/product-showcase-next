"use client";

import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaShippingFast,
    FaHeadset,
    FaCheckCircle,
    FaAward,
    FaSmile,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import { BASE_URL } from "@/lib/api";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface AboutData {
    title?: string;
    description?: string;
    ourStory?: string;
    coverImage?: string;
    team?: TeamMember[];
}

export default function AboutClient() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/settings/about`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) setAboutData(data);
            })
            .catch(() => { });
    }, []);

    const team = aboutData?.team || [
        {
            name: "Rahim Ahmed",
            role: "CEO & Founder",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Karim Khan",
            role: "Head of Operations",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
            name: "Fatima Begum",
            role: "Lead Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Jamal Uddin",
            role: "Marketing Head",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
    ];

    const getImageUrl = (url?: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${BASE_URL}${url}`;
    };

    return (
        <div className="min-h-screen font-nunito">
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-r from-violet-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 text-center z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6">
                        EST. 2024
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        {aboutData?.title || (
                            <>
                                We Are <span className="text-yellow-300">Product Showcase</span>
                            </>
                        )}
                    </h1>
                    <div className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed">
                        {aboutData?.description || (
                            <p>
                                Revolutionizing your shopping experience with premium quality products
                                and unmatched customer service. We deliver happiness to your doorstep.
                            </p>
                        )}
                    </div>

                    <div className="flex justify-center gap-4">
                        <AppButton
                            size="large"
                            className="px-8 h-12 bg-white! text-violet-700! hover:bg-gray-100! border-0! font-bold"
                            onClick={() =>
                                document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Discover More
                        </AppButton>
                        <Link href="/">
                            <AppButton
                                size="large"
                                className="px-8 h-12 bg-transparent! text-white! border-white! hover:bg-white/10!"
                            >
                                Start Shopping
                            </AppButton>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 space-y-24 pb-20 -mt-10 md:-mt-20 relative z-10">
                {/* STATS SECTION */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Products", value: "500+", icon: <FaCheckCircle /> },
                        { label: "Customers", value: "10k+", icon: <FaUsers /> },
                        { label: "Reviews", value: "4.8/5", icon: <FaSmile /> },
                        { label: "Awards", value: "15+", icon: <FaAward /> },
                    ].map((stat, i) => (
                        <AppCard
                            key={i}
                            className="text-center py-6 border-0! shadow-lg! hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="text-violet-500 text-3xl mb-3 flex justify-center">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </AppCard>
                    ))}
                </div>

                {/* OUR STORY */}
                <section id="story" className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h4 className="text-violet-600 font-bold uppercase tracking-widest text-sm">
                            Our Story
                        </h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                            From a Small Room to a <br />
                            <span className="text-violet-600">Nationwide Store</span>
                        </h2>
                        <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {aboutData?.ourStory || (
                                <>
                                    <p className="mb-4">
                                        আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন নিয়ে - বাংলাদেশের প্রতিটি মানুষের
                                        কাছে বিশ্বমানের পণ্য পৌঁছে দেওয়া। আমরা বিশ্বাস করি গুণগত মান এবং গ্রাহক
                                        সন্তুষ্টিই ব্যবসার মূল চালিকাশক্তি।
                                    </p>
                                    <p>
                                        We started with a vision to revolutionize e-commerce in Bangladesh.
                                        Today, we are proud to serve thousands of happy customers with our
                                        curated collection of premium products.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                                    <FaShippingFast size={20} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800">Fast Delivery</h5>
                                    <p className="text-sm text-gray-500">All over Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <FaHeadset size={20} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800">24/7 Support</h5>
                                    <p className="text-sm text-gray-500">Always here for you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-violet-200 rounded-2xl transform rotate-3"></div>
                        <Image
                            src={
                                aboutData?.coverImage
                                    ? getImageUrl(aboutData.coverImage)
                                    : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            }
                            alt="Our Office"
                            width={500}
                            height={400}
                            className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                        />
                    </div>
                </section>

                {/* TEAM */}
                <section className="text-center">
                    <h4 className="text-violet-600 font-bold uppercase tracking-widest text-sm mb-3">
                        The Minds Behind
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
                        Meet Our Expert Team
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <Image
                                        src={member.image ? getImageUrl(member.image) : "https://placehold.co/150"}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-violet-500 font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-violet-900 rounded-3xl p-10 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Experience the Best?
                        </h2>
                        <p className="text-violet-200 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their daily needs.
                            Shop now and get exclusive offers!
                        </p>
                        <Link href="/">
                            <AppButton
                                size="large"
                                className="bg-yellow-400! text-violet-900! hover:bg-yellow-300! border-0! px-10 h-14 text-lg font-bold"
                            >
                                Shop Now
                            </AppButton>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
