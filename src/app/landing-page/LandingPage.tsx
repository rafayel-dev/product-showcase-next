"use client";

import React, { useState, useEffect } from "react";
import {
    FaCheckCircle,
    FaPhoneAlt,
    FaMinus,
    FaPlus,
    FaShoppingCart,
    FaClock,
    FaTruck,
    FaHandHoldingUsd,
    FaWhatsapp,
} from "react-icons/fa";
import { Button, Form, Input, Carousel, Image, Select } from "antd";
import { BsWhatsapp } from "react-icons/bs";

const { Option } = Select;

const LandingPage = () => {
    const [form] = Form.useForm();
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const phone = "+8801751876070";
    const message = `Hello, I need help`

    const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 59 });

    const deliveryCharge = 60;

    const handleWhatsAppClick = () => {
        const message = `
*I want to buy this product.* 🛒
------------------
*Product:* ${product.name}
*Quantity:* ${quantity}
*Total Price:* ৳${product.price * quantity + deliveryCharge}
    `;
        const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waLink, "_blank");
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const product = {
        name: "Premium Wireless Earbuds Pro - হাই-কোয়ালিটি সাউন্ড ও মেটাল বডি",
        price: 1250,
        oldPrice: 2500,
        discount: "৫০% ছাড়",
        features: [
            "অরিজিনাল সাউন্ড কোয়ালিটি",
            "৩০ ঘণ্টা ব্যাটারি ব্যাকআপ",
            "পানিরোধী (Waterproof) বডি",
            "টাচ কন্ট্রোল সুবিধা",
        ],
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop",

        ],
    };


    const handleQuantityChange = (type: any) => {
        if (type === "inc") setQuantity(q => q + 1);
        if (type === "dec" && quantity > 1) setQuantity(q => q - 1);
    };

    const scrollToOrder = () => {
        document.getElementById("order-form-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen text-slate-800 font-sans pb-24 md:pb-0">

            {/* --- TOP ANNOUNCEMENT --- */}
            <div className="bg-red-600! text-white! py-1! text-center! text-sm! font-bold! animate-pulse!">
                অফারটি শেষ হতে আর অল্প কিছুক্ষণ বাকি! দ্রুত অর্ডার করুন।
            </div>

            {/* --- HEADER --- */}
            <nav className="bg-white/90 backdrop-blur-md shadow-sm! sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r! from-green-600! to-teal-600! italic tracking-tighter cursor-pointer!">Shop<span className="text-red-500!">BD</span></div>
                    <div className="flex gap-4">
                        <a href="tel:+8801751876070" className="flex items-center gap-2 text-slate-700 font-bold hover:text-green-600! hover:bg-green-100! transition-colors! bg-gray-100! px-4! py-2! rounded-full!">
                            <FaPhoneAlt className="text-green-600" /> 01751876070
                        </a>
                        <a href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} target="_blank" className="items-center hidden md:flex gap-2 text-slate-700 font-bold hover:text-green-600! hover:bg-green-100! transition-colors! bg-gray-100! px-4! py-2! rounded-full!">
                            <FaWhatsapp size={20} className="text-green-600" /> WhatsApp
                        </a>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto max-w-6xl px-4 py-6">

                {/* --- HERO SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 md:p-8 rounded-xl shadow-md! shadow-gray-200/50! border border-white/50! relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64! h-64! bg-green-50! rounded-full! blur-3xl! -mr-32! -mt-32! pointer-events-none! opacity-50!"></div>

                    {/* GALLERY */}
                    <div className="space-y-4 relative z-10 order-1 md:order-1">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                            <span className="absolute top-4 left-4 z-10 bg-gradient-to-r! from-red-600! to-orange-600! text-white! px-3! py-1! rounded-full! font-bold! shadow-lg! text-xs! md:text-sm! tracking-wide! animate-pulse!">
                                {product.discount}
                            </span>
                            <Carousel autoplay dotPlacement="bottom">
                                {product.images.map((img, i) => (
                                    <div key={i} className="aspect-square">
                                        <img src={img} alt="product" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="flex gap-2">
                            {product.images.map((img, i) => (
                                <div key={i} className="rounded-lg overflow-hidden border border-gray-300 hover:border-green-500 cursor-pointer w-12! h-12! md:w-20! md:h-20!">
                                    <img src={img} alt="thumb" className="w-full! h-full! object-cover!" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col order-2 md:order-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 leading-tight z-10">
                            {product.name}
                        </h1>

                        <div className="bg-orange-50/80 p-5 rounded-2xl border border-orange-200 mb-8 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-orange-700 font-bold mb-3 uppercase tracking-wider text-xs">
                                <FaClock className="text-sm md:text-lg" /> ফ্ল্যাশ সেল চলছে:
                                <span className="bg-orange-600 text-white px-2 py-1 rounded-md font-mono text-sm shadow-md animate-pulse">
                                    {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-center text-4xl p-2 md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">৳{product.price}</span>
                                <div className="flex flex-col">
                                    <span className="text-center text-xl text-gray-400! line-through! decoration-2! decoration-red-400!">৳{product.oldPrice}</span>
                                    <span className="text-center text-xs text-green-600! font-bold! bg-green-100! px-2! py-0.5! rounded-full!">Save ৳{product.oldPrice - product.price}</span>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {product.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                                    <FaCheckCircle className="text-green-500! flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>

                        <Button
                            type="primary"
                            size="large"
                            onClick={scrollToOrder}
                            className="bg-gradient-to-r! from-green-600! to-teal-600! hover:from-green-700! hover:to-teal-700! h-14! md:h-16! text-lg! md:text-xl! font-black! rounded-2xl! border-none! shadow-xl! shadow-green-600/30! w-full! animate-bounce-slow!"
                        >
                            অর্ডার করতে ক্লিক করুন <FaShoppingCart className="ml-2" />
                        </Button>

                        <div className="flex justify-center gap-6 mt-8">
                            <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
                                <FaHandHoldingUsd className="text-2xl! text-green-600!" />
                                <span className="text-sm! text-center">ক্যাশ অন ডেলিভারি</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
                                <FaTruck className="text-2xl! text-blue-600!" />
                                <span className="text-sm! text-center">সারা দেশে হোম ডেলিভারি</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DETAILED DESCRIPTION --- */}
                <div className="mb-10! mt-6!">
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md! border border-gray-100! relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800! mb-4!">কেন কিনবেন এই <span className="text-transparent bg-clip-text bg-gradient-to-r! from-blue-600! to-purple-600!">Earbuds Pro?</span></h2>
                            <p className="text-slate-500 text-lg">এটি সাধারণ কোনো ইয়ারফোন নয়। এটি আপনার মিউজিক এক্সপেরিয়েন্সকে নিয়ে যাবে এক অনন্য উচ্চতায়। গেমিং হোক বা গান, এর ব্যাস এবং ক্ল্যারিটি আপনাকে মুগ্ধ করবে।</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            {[
                                { title: "ক্রিস্টাল ক্লিয়ার সাউন্ড", desc: "এর ডিপ ব্যাস এবং নয়েজ ক্যান্সেলেশন টেকনোলজি আপনাকে দেবে স্টুডিও কোয়ালিটি সাউন্ড।", bg: "bg-blue-50", border: "border-blue-100" },
                                { title: "লং লাস্টিং ব্যাটারি", desc: "একবার চার্জে টানা ৬ ঘণ্টা প্লেব্যাক এবং কেস সহ ৩০ ঘণ্টা পর্যন্ত ব্যাকআপ সুবিধা।", bg: "bg-green-50", border: "border-green-100" },
                                { title: "স্মার্ট টাচ কন্ট্রোল", desc: "ফোন রিসিভ, গান পরিবর্তন বা ভলিউম কন্ট্রোল - সব কিছুই করুন আঙুলের ইশারায়।", bg: "bg-purple-50", border: "border-purple-100" },
                            ].map((feature, i) => (
                                <div key={i} className={`${feature.bg} p-8 rounded-3xl border ${feature.border} hover:scale-105 transition-transform duration-300`}>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- VIDEO REVIEW SECTION --- */}
                <div className="mb-20 text-center">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 flex items-center justify-center gap-2">
                        ভিডিও রিভিউ দেখুন <span className="text-red-600! animate-pulse!">▶</span>
                    </h2>
                    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border-4 border-white bg-black">
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=xxxxxx"
                                title="Product Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>



                {/* --- ORDER FORM SECTION --- */}
                <div id="order-form-section" className="mt-16! scroll-mt-28! mb-8!">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r! from-green-400! via-teal-500! to-blue-500!"></div>
                        <div className="bg-slate-50 p-8 text-center border-b border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">অর্ডার কনফার্ম করতে নিচের ফরমটি পূরণ করুন 👇</h2>
                            <p className="text-gray-500">আমরা আপনার সাথে যোগাযোগ করে অর্ডার ফাইনাল করবো</p>
                        </div>

                        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Billing Form */}
                            <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
                                <Form.Item label={<span className="font-bold text-slate-700">আপনার নাম</span>} required className="mb-2">
                                    <Input placeholder="আপনার নাম লিখুন" className="h-14 rounded-xl border-gray-300 focus:border-green-500! focus:shadow-green-500/10! text-lg bg-gray-50! hover:bg-white! hover:border-green-500! transition-colors!" />
                                </Form.Item>
                                <Form.Item label={<span className="font-bold text-slate-700">মোবাইল নাম্বার</span>} required className="mb-2">
                                    <Input placeholder="০১XXXXXXXXX" className="h-14 rounded-xl border-gray-300! hover:border-green-500! focus:border-green-500! focus:shadow-green-500/10! text-lg bg-gray-50! hover:bg-white! transition-colors" />
                                </Form.Item>
                                <Form.Item label={<span className="font-bold text-slate-700">সম্পূর্ণ ঠিকানা</span>} required className="mb-2">
                                    <Input.TextArea placeholder="বাসা নং, রোড নং, এলাকা ও জেলা" autoSize={{ minRows: 3, maxRows: 5 }} className="rounded-xl border-gray-300! hover:border-green-500! focus:border-green-500! focus:shadow-green-500/10! text-lg bg-gray-50! hover:bg-white! transition-colors p-4!" />
                                </Form.Item>
                                <Form.Item label={<span className="font-bold text-slate-700">ডেলিভারি এরিয়া</span>} className="mb-0 hover:text-green-500!">
                                    <Select defaultValue="dhaka" className="h-14 text-lg hover:border-green-500! hover:shadow-green-500/10! hover:focus:border-green-500! hover:focus:shadow-green-500/10! bg-gray-50! hover:bg-white! transition-colors" styles={{ popup: { root: { borderRadius: "0.75rem" } } }}>
                                        <Option value="dhaka">ঢাকার ভিতরে (৬০ টাকা)</Option>
                                        <Option value="outside">ঢাকার বাইরে (১২০ টাকা)</Option>
                                    </Select>
                                </Form.Item>
                            </Form>

                            {/* Order Summary */}
                            <div className="bg-gray-50/30 p-2 rounded-xl border border-gray-50/30">
                                <h3 className="font-bold text-lg mb-4 border-bottom pb-2">আপনার অর্ডার</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={product.images[0]} className="w-16 h-16 rounded object-cover" />
                                        <span className="font-medium text-sm">{product.name}</span>
                                    </div>
                                </div>
                                <div className="flex w-29 items-center border border-gray-300 rounded-lg bg-white">
                                    <button onClick={() => handleQuantityChange("dec")} className="px-3 py-1 hover:text-red-500 cursor-pointer"><FaMinus /></button>
                                    <span className="px-3 font-bold border-x border-gray-300">{quantity}</span>
                                    <button onClick={() => handleQuantityChange("inc")} className="px-3 py-1 hover:text-green-500 cursor-pointer"><FaPlus /></button>
                                </div>
                                <hr className="my-4 border-gray-200" />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>সাব-টোটাল</span>
                                        <span>৳{product.price * quantity}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>ডেলিভারি চার্জ</span>
                                        <span>৳{deliveryCharge}</span>
                                    </div>
                                    <div className="flex justify-between font-black text-xl text-slate-800 pt-2 border-t border-gray-300 mt-2">
                                        <span>মোট টাকা</span>
                                        <span>৳{(product.price * quantity) + deliveryCharge}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => form.submit()}
                                    className="w-full! mt-6! h-14! md:h-16! bg-gradient-to-r! from-red-600! to-pink-600! hover:from-red-700! hover:to-pink-700! hover:border-red-700! text-white! font-black! text-base! md:text-xl! rounded-2xl! border-none! shadow-xl! shadow-red-500/20! transform! hover:scale-[1.01]! transition-all! hover:shadow-red-500/20! duration-300!"
                                >
                                    অর্ডার কনফার্ম করুন <FaCheckCircle className="ml-2" />
                                </Button>
                                <Button onClick={handleWhatsAppClick} className="w-full! mt-6! h-14! md:h-16! bg-gradient-to-r! from-green-600! to-green-600! hover:from-green-700! hover:to-green-700! hover:border-green-700! text-white! font-black! text-base! md:text-xl! rounded-2xl! border-none! shadow-xl! shadow-green-500/20! transform! hover:scale-[1.01]! transition-all! hover:shadow-green-500/20! duration-300!">
                                    <BsWhatsapp size={28} className="ml-2" /> Order via WhatsApp
                                </Button>
                                <p className="text-center text-xs text-gray-500 mt-4 italic">
                                    পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা!
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            {/* --- STICKY MOBILE CTA --- */}
            <div className="fixed bottom-0 left-0 w-full bg-white/90! backdrop-blur-xl! border-t border-gray-200! p-3 md:hidden z-50 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <Button
                    onClick={handleWhatsAppClick}
                    className="flex-1! h-12! rounded-lg! font-bold! border-none! bg-green-600! text-white!"
                >
                    <BsWhatsapp size={22} /> WhatsApp
                </Button>
                <Button
                    type="primary"
                    className="flex-1! h-12! rounded-lg! font-bold! border-none!"
                    onClick={scrollToOrder}
                >
                    অর্ডার করুন
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;