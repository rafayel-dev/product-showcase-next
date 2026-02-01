"use client";

import React, { useEffect, useState } from "react";
import { Typography, Divider, Result, Empty } from "antd";
import { CheckCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import { formatCurrency } from "@/utils/price";
import { API_URL } from "@/lib/api";
import type { CartItem } from "@/types";
import FloatingChat from "@/components/FloatingChat/FloatingChat";

const { Title, Text, Paragraph } = Typography;

interface OrderData {
    orderId: string;
    total: number;
    paymentMethod: string;
    address: string;
    items: CartItem[];
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryCharge: number;
    discount: number;
}

export default function OrderSuccessClient() {
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [mounted, setMounted] = useState(false);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedData = sessionStorage.getItem("orderData");
        if (storedData) {
            setOrderData(JSON.parse(storedData));
            // Clear after reading
            sessionStorage.removeItem("orderData");
        }
    }, []);

    const handleDownloadInvoice = async () => {
        if (!orderData?.orderId) return;

        setDownloading(true);
        try {
            const res = await fetch(`${API_URL}/orders/${orderData.orderId}/invoice`);
            if (!res.ok) throw new Error("Failed to download invoice");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice-${orderData.orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (err) {
            console.error("Error downloading invoice:", err);
        } finally {
            setDownloading(false);
        }
    };

    if (!mounted) {
        return null;
    }

    if (!orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <AppCard className="w-full max-w-lg rounded-2xl shadow-sm text-center p-8">
                    <Empty description="No order data found" />
                    <Link href="/" className="mt-4 block">
                        <AppButton type="primary">Go Home</AppButton>
                    </Link>
                </AppCard>
            </div>
        );
    }

    const subTotal = orderData.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <Result
                    icon={<CheckCircleOutlined className="text-green-500" />}
                    status="success"
                    title={
                        <Title level={2} className="text-green-600!">
                            অর্ডার সম্পন্ন হয়েছে! 🎉
                        </Title>
                    }
                    subTitle={
                        <Paragraph className="text-gray-600">
                            আপনার অর্ডার নম্বর: <Text strong copyable>#{orderData.orderId}</Text>
                            <br />
                            আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                        </Paragraph>
                    }
                />

                <AppCard bordered={false} className="mt-8">
                    <Title level={4}>📋 Order Details</Title>
                    <Divider />

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Text type="secondary">Customer Name</Text>
                            <Text strong>{orderData.customerName}</Text>
                        </div>
                        <div className="flex justify-between">
                            <Text type="secondary">Phone</Text>
                            <Text strong>{orderData.customerPhone}</Text>
                        </div>
                        <div className="flex justify-between">
                            <Text type="secondary">Address</Text>
                            <Text strong className="text-right max-w-[200px]">
                                {orderData.address}
                            </Text>
                        </div>
                        <div className="flex justify-between">
                            <Text type="secondary">Payment Method</Text>
                            <Text strong className="capitalize">{orderData.paymentMethod}</Text>
                        </div>
                    </div>

                    <Divider />

                    <Title level={5}>🛒 Items Ordered</Title>
                    <div className="space-y-2 mt-3">
                        {orderData.items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <Text>
                                    {item.title} x {item.quantity}
                                </Text>
                                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Text type="secondary">Subtotal</Text>
                            <Text>{formatCurrency(subTotal)}</Text>
                        </div>
                        <div className="flex justify-between">
                            <Text type="secondary">Delivery Charge</Text>
                            <Text>{formatCurrency(orderData.deliveryCharge)}</Text>
                        </div>
                        {orderData.discount > 0 && (
                            <div className="flex justify-between">
                                <Text type="secondary">Discount</Text>
                                <Text className="text-green-600">
                                    - {formatCurrency(orderData.discount)}
                                </Text>
                            </div>
                        )}
                        <Divider />
                        <div className="flex justify-between">
                            <Text strong className="text-lg">
                                Total
                            </Text>
                            <Text strong className="text-lg text-violet-600">
                                {formatCurrency(orderData.total)}
                            </Text>
                        </div>
                    </div>

                    <Divider />

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <AppButton
                            type="default"
                            icon={<DownloadOutlined />}
                            onClick={handleDownloadInvoice}
                            loading={downloading}
                            className="flex-1"
                        >
                            Download Invoice
                        </AppButton>
                        <Link href="/" className="flex-1">
                            <AppButton type="primary" block>
                                Continue Shopping
                            </AppButton>
                        </Link>
                    </div>
                </AppCard>
            </div>
        </div>
        <FloatingChat />
        </>
    );
}
