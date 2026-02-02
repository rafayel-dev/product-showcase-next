"use client";

import React from "react";
import { Typography, Divider } from "antd";
import AppCard from "@/components/common/AppCard";
import {
    FaFileContract,
    FaShoppingCart,
    FaTruck,
    FaUndo,
    FaExclamationTriangle,
    FaQuestionCircle,
} from "react-icons/fa";

const { Title, Paragraph, Text } = Typography;

const STORE_NAME = "Product Showcase";
const SUPPORT_EMAIL = "support@productshowcase.com";
const SUPPORT_PHONE = "+880 1751-876070";

interface TermsOfServiceClientProps {
    termsContent: string;
}

export default function TermsOfServiceClient({ termsContent }: TermsOfServiceClientProps) {
    const lastUpdated = "February 1, 2026";

    return (
        <div className="min-h-screen font-nunito pb-12 bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Terms of Service
                </h1>
                <p className="text-violet-100 text-lg max-w-2xl mx-auto px-4">
                    আমাদের সেবা ব্যবহারের শর্তাবলী
                </p>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 -mt-10">
                <AppCard className="shadow-xl border-0! rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <Text type="secondary" className="text-sm uppercase tracking-wider">
                            Last updated: {lastUpdated}
                        </Text>
                    </div>

                    <Paragraph className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                        এই Terms of Service আপনার এবং <strong>{STORE_NAME}</strong>-এর মধ্যে
                        একটি আইনি চুক্তি। আমাদের ওয়েবসাইট ব্যবহার করার পূর্বে অনুগ্রহ করে
                        শর্তাবলী মনোযোগ সহকারে পড়ুন। ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি এই
                        শর্তাবলীতে সম্মত হচ্ছেন।
                    </Paragraph>

                    <Divider />

                    {termsContent ? (
                        <div
                            className="prose prose-violet max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                        />
                    ) : (
                        <div className="space-y-12">
                            <Section
                                icon={<FaFileContract size={20} />}
                                color="orange"
                                title="1. Use of Website"
                            >
                                এই ওয়েবসাইট শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করা যাবে। কোনো প্রকার
                                অবৈধ, প্রতারণামূলক বা ক্ষতিকর কার্যকলাপ সম্পূর্ণভাবে নিষিদ্ধ।
                                আমাদের পূর্বানুমতি ছাড়া ওয়েবসাইটের কোনো কন্টেন্ট কপি, পুনঃপ্রকাশ
                                বা বিতরণ করা যাবে না।
                            </Section>

                            <Section
                                icon={<FaShoppingCart size={20} />}
                                color="violet"
                                title="2. Orders & Pricing"
                            >
                                পণ্যের মূল্য, অফার ও ডিসকাউন্ট সময় অনুযায়ী পরিবর্তন হতে পারে।
                                আমরা সর্বোচ্চ চেষ্টা করি সঠিক তথ্য প্রদর্শনের জন্য, তবে কোনো
                                কারিগরি বা মানবিক ত্রুটির কারণে ভুল মূল্য প্রদর্শিত হলে
                                {STORE_NAME} সংশ্লিষ্ট অর্ডার বাতিল করার অধিকার সংরক্ষণ করে।
                            </Section>

                            <Section
                                icon={<FaTruck size={20} />}
                                color="green"
                                title="3. Delivery Policy"
                            >
                                <div className="bg-violet-50/50 p-6 rounded-xl border border-violet-100">
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong className="text-violet-700">ঢাকার ভিতরে:</strong> ১–২ কর্মদিবস
                                        </li>
                                        <li>
                                            <strong className="text-violet-700">ঢাকার বাইরে:</strong> ২–৪ কর্মদিবস
                                        </li>
                                        <li>
                                            অনিবার্য কারণে (আবহাওয়া, প্রাকৃতিক দুর্যোগ বা রাজনৈতিক
                                            পরিস্থিতি) ডেলিভারি সময় বিলম্বিত হতে পারে।
                                        </li>
                                    </ul>
                                </div>
                            </Section>

                            <Section
                                icon={<FaUndo size={20} />}
                                color="violet"
                                title="4. Return & Refund Policy"
                            >
                                আমরা গ্রাহক সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব দিই। পণ্য গ্রহণের পর
                                কোনো সমস্যা থাকলে নিম্নলিখিত শর্তে রিটার্ন গ্রহণযোগ্য:
                                <ul className="list-disc pl-5 mt-4 space-y-3">
                                    <li>
                                        পণ্য গ্রহণের <strong>৭ দিনের</strong> মধ্যে রিটার্ন করতে হবে
                                    </li>
                                    <li>
                                        পণ্য অবশ্যই অব্যবহৃত, অবিকৃত এবং অরিজিনাল প্যাকেজিং-এ থাকতে হবে
                                    </li>
                                    <li>
                                        রিফান্ড (প্রযোজ্য হলে) ৭–১০ কর্মদিবসের মধ্যে প্রসেস করা হবে
                                    </li>
                                    <li>
                                        পণ্যে কোনো ত্রুটি না থাকলে রিটার্ন চার্জ ক্রেতাকে বহন করতে হতে পারে
                                    </li>
                                </ul>
                            </Section>

                            <Section
                                icon={<FaExclamationTriangle size={20} />}
                                color="orange"
                                title="5. Limitation of Liability"
                            >
                                প্রাকৃতিক দুর্যোগ, কুরিয়ার বিলম্ব বা আমাদের নিয়ন্ত্রণের বাইরে থাকা
                                কোনো পরিস্থিতির কারণে সৃষ্ট ক্ষতি বা বিলম্বের জন্য
                                {STORE_NAME} আইনগতভাবে দায়বদ্ধ থাকবে না। তবে আমরা সর্বোচ্চ
                                সহযোগিতার মাধ্যমে সমস্যা সমাধানে সচেষ্ট থাকবো।
                            </Section>
                        </div>
                    )}

                    {/* Contact */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-12">
                        <div className="flex items-center gap-3 mb-4">
                            <FaQuestionCircle className="text-violet-600 text-xl" />
                            <Title level={4} className="m-0!">
                                Questions?
                            </Title>
                        </div>

                        <Paragraph className="text-gray-700">
                            শর্তাবলী সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:
                        </Paragraph>

                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            <ContactCard label="Email Support" value={SUPPORT_EMAIL} />
                            <ContactCard label="Phone Support" value={SUPPORT_PHONE} />
                        </div>
                    </div>
                </AppCard>
            </div>
        </div>
    );
}

const Section = ({ icon, title, color, children }: any) => (
    <div className="flex gap-6">
        <div className={`hidden md:flex min-w-14 h-14 rounded-2xl items-center justify-center mt-1 shadow-sm ${color === 'violet' ? 'bg-violet-100 text-violet-600' : color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
            {icon}
        </div>
        <div className="flex-1">
            <Title level={3} className="text-violet-800! mb-4 text-xl">
                {title}
            </Title>
            <div className="text-gray-600 leading-relaxed text-base font-medium">
                {children}
            </div>
        </div>
    </div>
);

const ContactCard = ({ label, value }: any) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 group hover:border-violet-200 transition-colors">
        <Text type="secondary" className="text-xs uppercase font-bold tracking-widest text-gray-400 group-hover:text-violet-400">
            {label}
        </Text>
        <Paragraph className="m-0 font-bold text-violet-700 text-lg">
            {value}
        </Paragraph>
    </div>
);
