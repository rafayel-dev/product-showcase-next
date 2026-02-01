"use client";

import { Result } from "antd";
import Link from "next/link";
import AppButton from "@/components/common/AppButton";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Result
                status="404"
                title="404"
                subTitle="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।"
                extra={
                    <Link href="/">
                        <AppButton type="primary">Back Home</AppButton>
                    </Link>
                }
            />
        </div>
    );
}
