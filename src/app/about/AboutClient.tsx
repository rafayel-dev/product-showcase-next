"use client";

import React, { useState } from "react";
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
import { BASE_URL } from "@/lib/apiConstants";

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

export default function AboutClient({ initialData }: { initialData: any }) {
    const [aboutData] = useState<AboutData | null>(initialData as AboutData);

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
        <div className="min-h-screen font-nunito bg-gray-50/50">
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-800 text-white overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

                <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-40 text-center z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-8 uppercase tracking-widest border border-white/20">
                        EST. 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                        {aboutData?.title || (
                            <>
                                We Are <span className="text-yellow-400 drop-shadow-sm">Product Showcase</span>
                            </>
                        )}
                    </h1>
                    <div className="text-xl md:text-2xl text-violet-50 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                        {aboutData?.description || (
                            <p>
                                Revolutionizing your shopping experience with premium quality products
                                and unmatched customer service. We deliver happiness to your doorstep.
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <AppButton
                            size="large"
                            className="px-10 h-14 bg-white! text-violet-700! hover:bg-violet-50! border-0! font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                            onClick={() =>
                                document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Discover Our Story
                        </AppButton>
                        <Link href="/">
                            <AppButton
                                size="large"
                                className="px-10 h-14 bg-transparent! text-white! border-2 border-white/40! hover:bg-white/10! font-bold text-lg"
                            >
                                Start Shopping
                            </AppButton>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 space-y-32 pb-32 -mt-16 relative z-10">
                {/* STATS SECTION */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { label: "Products", value: "500+", icon: <FaCheckCircle />, color: "violet" },
                        { label: "Customers", value: "10k+", icon: <FaUsers />, color: "orange" },
                        { label: "Reviews", value: "4.8/5", icon: <FaSmile />, color: "green" },
                        { label: "Awards", value: "15+", icon: <FaAward />, color: "violet" },
                    ].map((stat, i) => (
                        <AppCard
                            key={i}
                            className="text-center py-10 px-4 border-0! shadow-2xl! hover:-translate-y-3 transition-all duration-500 bg-white/95 backdrop-blur-sm"
                        >
                            <div className={`text-4xl mb-4 flex justify-center 
                                ${stat.color === 'violet' ? 'text-violet-500' :
                                    stat.color === 'orange' ? 'text-orange-500' : 'text-green-500'}`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                        </AppCard>
                    ))}
                </div>

                {/* OUR STORY */}
                <section id="story" className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="inline-block px-4 py-1.5 rounded-lg bg-violet-100 text-violet-700 text-sm font-bold uppercase tracking-widest">
                            Behind the Scenes
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15]">
                            From a Vision to a <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Nationwide Reality</span>
                        </h2>
                        <div className="text-gray-600 text-lg md:text-xl leading-relaxed space-y-6 font-medium">
                            {aboutData?.ourStory || (
                                <>
                                    <p>
                                        আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন নিয়ে - বাংলাদেশের প্রতিটি মানুষের
                                        কাছে বিশ্বমানের পণ্য পৌঁছে দেওয়া। আমরা বিশ্বাস করি গুণগত মান এবং গ্রাহক
                                        সন্তুষ্টিই ব্যবসার মূল চালিকাশক্তি।
                                    </p>
                                    <p>
                                        We started with a vision to catalyze a new era of e-commerce in Bangladesh.
                                        Today, we are honored to serve a community of thousands, offering a curated
                                        selection of premium essentials that speak of quality and trust.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-violet-200 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 shadow-inner">
                                    <FaShippingFast size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-lg">Fast Delivery</h5>
                                    <p className="text-sm text-gray-500 font-semibold tracking-wide">Nationwide Network</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                                    <FaHeadset size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-lg">24/7 Support</h5>
                                    <p className="text-sm text-gray-500 font-semibold tracking-wide">Expert Assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2">
                        <div className="absolute -inset-6 bg-gradient-to-tr from-violet-200 to-indigo-100 rounded-[2.5rem] transform rotate-3 -z-10"></div>
                        <div className="absolute -inset-1 bg-white/30 backdrop-blur-sm rounded-[2.3rem] -z-10"></div>
                        <Image
                            priority
                            src={
                                aboutData?.coverImage
                                    ? getImageUrl(aboutData.coverImage)
                                    : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            }
                            alt="Our Office"
                            width={600}
                            height={500}
                            className="relative rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] w-full object-cover h-[500px] border-8 border-white"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block border border-gray-100 animate-bounce-slow">
                            <p className="font-serif italic text-gray-600 text-lg leading-relaxed">
                                &quot;Quality is our signature, satisfaction is our legacy.&quot;
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-600"></div>
                                <div>
                                    <p className="font-black text-gray-900 text-sm">CEO & Founder</p>
                                    <p className="text-violet-600 font-bold text-xs uppercase tracking-tighter">Product Showcase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TEAM SECTION */}
                <section className="text-center space-y-16">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h4 className="text-violet-600 font-black uppercase tracking-[0.3em] text-xs">
                            The A-Team
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                            Meet Our Expert Minds
                        </h2>
                        <p className="text-gray-500 text-lg font-medium">
                            Driven by passion, defined by excellence. The people making it all happen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-violet-100"
                            >
                                <div className="relative w-40 h-40 mx-auto mb-6">
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-violet-100 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Image
                                        src={member.image ? getImageUrl(member.image) : "https://placehold.co/150"}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover border-8 border-white shadow-lg group-hover:scale-110 transition-transform duration-500 z-10"
                                    />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">
                                    {member.name}
                                </h3>
                                <p className="text-violet-600 font-bold text-sm uppercase tracking-widest bg-violet-50 inline-block px-3 py-1 rounded-full">
                                    {member.role}
                                </p>

                                <div className="mt-6 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                    {/* Social icons could go here */}
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-violet-100 cursor-pointer flex items-center justify-center transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-violet-100 cursor-pointer flex items-center justify-center transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="bg-gradient-to-r from-violet-900 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                            Elevate Your <br /> Shopping Experience
                        </h2>
                        <p className="text-violet-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join over 10,000 satisfied shoppers who trust us for quality, speed, and premium service every single day.
                        </p>
                        <Link href="/">
                            <AppButton
                                size="large"
                                className="bg-yellow-400! text-violet-950! hover:bg-yellow-300! hover:scale-105 active:scale-95 border-0! px-14 h-16 text-xl font-black shadow-2xl transition-all rounded-2xl"
                            >
                                Shop Premium Now
                            </AppButton>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
