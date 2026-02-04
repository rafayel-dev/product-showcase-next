"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import { BASE_URL } from "@/lib/apiConstants";
import { defaultTeam, statsData, featuresData, TeamMember } from "@/data/aboutData";

interface AboutData {
    title?: string;
    description?: string;
    ourStory?: string;
    coverImage?: string;
    team?: TeamMember[];
}

const getImageUrl = (url?: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
};

// Sub-component for Stats
const StatCard = ({ stat }: { stat: typeof statsData[0] }) => (
    <AppCard className="text-center py-10 px-4 border-0! shadow-2xl! hover:-translate-y-3 transform! transition-all! duration-500! bg-white/95 backdrop-blur-sm">
        <div className={`text-4xl mb-4 flex justify-center transform! transition-all! duration-500! 
            ${stat.color === 'violet' ? 'text-violet-500' :
                stat.color === 'orange' ? 'text-orange-500' : 'text-green-500'}`}>
            <stat.icon />
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
    </AppCard>
);

// Sub-component for Features
const FeatureItem = ({ feature }: { feature: typeof featuresData[0] }) => (
    <div className={`flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 transition-colors 
        ${feature.color === 'violet' ? 'hover:border-violet-200' : 'hover:border-orange-200'}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner 
            ${feature.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-orange-100 text-orange-600'}`}>
            <feature.icon size={24} />
        </div>
        <div>
            <h5 className="font-bold text-gray-900 text-lg">{feature.title}</h5>
            <p className="text-sm text-gray-500 font-semibold tracking-wide">{feature.desc}</p>
        </div>
    </div>
);

// Sub-component for Team
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl! transition-all! duration-500! p-8 border border-gray-100 hover:border-violet-100">
        <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-violet-100 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Image
                src={member.image ? getImageUrl(member.image) : "https://placehold.co/150"}
                alt={member.name}
                fill
                className="rounded-full object-cover border-8 border-white shadow-lg group-hover:scale-110 transition-transform! duration-500! z-10"
            />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight!">{member.name}</h3>
        <p className="text-violet-600 font-bold text-sm uppercase tracking-widest bg-violet-50 inline-block px-3 py-1 rounded-full">
            {member.role}
        </p>
        {/* <div className="mt-6 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-0 group-hover:translate-y-0 duration-500">
            {[1, 2].map(i => (
                <div key={i} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-violet-100 cursor-pointer flex items-center justify-center transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                </div>
            ))}
        </div> */}
    </div>
);

export default function AboutClient({ initialData }: { initialData: any }) {
    const [aboutData] = useState<AboutData | null>(initialData as AboutData);
    const team = aboutData?.team || defaultTeam;

    return (
        <div className="min-h-screen font-nunito">
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

                <div className="relative max-w-7xl! mx-auto px-4 py-18 md:py-32 md:pt-24 text-center z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-8 uppercase tracking-widest border border-white/20">EST. 2024</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                        {aboutData?.title || <>We Are <span className="text-yellow-400 drop-shadow-sm">Product Showcase</span></>}
                    </h1>
                    <div className="text-xl md:text-2xl text-violet-50 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed font-medium">
                        {aboutData?.description || (
                            <p>Revolutionizing your shopping experience with premium quality products and unmatched customer service. We deliver happiness to your doorstep.</p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-5 mb-8 md:mb-0">
                        <AppButton size="large" className="px-10 h-14 bg-white! text-violet-700! hover:bg-violet-50! border-0! font-bold text-lg shadow-xl" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
                            Discover Our Story
                        </AppButton>
                        <Link href="/"><AppButton size="large" className="px-10 h-14 bg-transparent! text-white! border-2 border-white/40! hover:bg-white/10! font-bold text-lg">Start Shopping</AppButton></Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl! mx-auto px-4 space-y-32 pb-32 -mt-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {statsData.map((stat, i) => <StatCard key={i} stat={stat} />)}
                </div>

                <section id="story" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="inline-block px-4 py-1.5 rounded-lg bg-violet-100 text-violet-700 text-sm font-bold uppercase tracking-widest">Behind the Scenes</div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15]">From a Vision to a <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Nationwide Reality</span></h2>
                        <div className="text-gray-600 text-lg md:text-xl leading-relaxed space-y-6 font-medium">
                            {aboutData?.ourStory || (
                                <>
                                    <p>আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন নিয়ে - বাংলাদেশের প্রতিটি মানুষের কাছে বিশ্বমানের পণ্য পৌঁছে দেওয়া। আমরা বিশ্বাস করি গুণগত মান এবং গ্রাহক সন্তুষ্টিই ব্যবসার মূল চালিকাশক্তি।</p>
                                    <p>We started with a vision to catalyze a new era of e-commerce in Bangladesh. Today, we are honored to serve a community of thousands, offering a curated selection of premium essentials.</p>
                                </>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {featuresData.map((f, i) => <FeatureItem key={i} feature={f} />)}
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2">
                        <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-tr from-violet-200 to-indigo-100 rounded-[2.5rem] transform md:rotate-3 -z-10"></div>
                        <Image priority src={aboutData?.coverImage ? getImageUrl(aboutData.coverImage) : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80"} alt="Our Office" width={600} height={500} className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[300px] md:h-[450px] border-8 border-white" />
                        <div className="absolute md:-bottom-10 -bottom-8 -left-2 md:-left-10 bg-white p-2 md:p-4 rounded-3xl shadow-xl md:w-xs w-54 animate-bounce-slow!">
                            <p className="font-serif italic text-gray-600 text-sm text-center md:text-lg">&quot;Quality is our signature, satisfaction is our legacy.&quot;</p>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="md:w-10 md:h-10 w-8 h-8 rounded-full shadow-lg bg-violet-600 border-3 border-white"></div>
                                <div><p className="font-black text-gray-900 text-sm">CEO & Founder</p><p className="text-violet-600 font-bold text-xs uppercase tracking-tighter">Product Showcase</p></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-center space-y-16">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h4 className="text-violet-600 font-black uppercase tracking-[0.3em] text-xs">The A-Team</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900">Meet Our Expert Minds</h2>
                        <p className="text-gray-500 text-lg font-medium">Driven by passion, defined by excellence. The people making it all happen.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {team.map((member, i) => <TeamMemberCard key={i} member={member} />)}
                    </div>
                </section>

                <section className="bg-gradient-to-r from-violet-900 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <div className="relative z-10 space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">Elevate Your <br /> Shopping Experience</h2>
                        <p className="text-violet-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">Join over 10,000 satisfied shoppers who trust us for quality, speed, and premium service every single day.</p>
                        <Link href="/"><AppButton size="large" className="bg-yellow-400! text-violet-950! hover:bg-yellow-300! hover:scale-105 active:scale-95 border-0! px-14 h-16 text-xl font-black shadow-2xl transition-all rounded-2xl">Shop Premium Now</AppButton></Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
