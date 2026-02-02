"use client";

import { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Input } from "antd";
import ProductList from "@/components/features/Product/ProductList";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import EmptyState from "@/components/common/EmptyState";
import Slider from "@/components/features/Slider/Slider";
import { useProducts } from "@/hooks/useProducts";
import AppSpin from "@/components/common/AppSpin";
import type { Product, Slide } from "@/types";

import dynamic from "next/dynamic";

const WhatsAppFloat = dynamic(() => import("@/components/FloatingChat/WhatsAppFloat"), {
    ssr: false,
});

const { Title } = Typography;
const { Option } = Select;

interface HomeClientProps {
    initialProducts: Product[];
    initialSliders: Slide[];
    categories: { id: string; name: string }[];
}

export default function HomeClient({
    initialProducts,
    initialSliders,
    categories,
}: HomeClientProps) {
    const {
        displayedProducts,
        loading,
        hasMore,
        loadMoreProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        setAllProducts,
    } = useProducts(initialProducts);

    const [sliderData] = useState<Slide[]>(initialSliders);

    // Hydrate products from SSR
    useEffect(() => {
        if (initialProducts.length > 0) {
            setAllProducts(initialProducts);
        }
    }, [initialProducts, setAllProducts]);

    return (
        <>
            <div className="container mx-auto px-4 pt-8">
                {/* ================= SLIDER ================= */}
                <Slider slides={sliderData} />

                {/* ================= Title and Filter Dropdown ================= */}
                <Row gutter={[12, 12]} align="middle" style={{ marginTop: 20 }}>
                    {/* Title */}
                    <Col xs={24} md={8}>
                        <Title
                            className="font-nunito"
                            level={1}
                            style={{
                                margin: 0,
                                fontSize: "clamp(22px, 4vw, 32px)",
                            }}
                        >
                            New Arrival Products
                        </Title>
                    </Col>

                    {/* Search + Select (Right side) */}
                    <Col xs={24} md={16}>
                        <div className="flex md:flex-row md:justify-end gap-3">
                            <Input.Search
                                placeholder="Search products..."
                                allowClear
                                value={searchQuery}
                                onSearch={(value) => setSearchQuery(value)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="md:w-64! w-50!"
                            />

                            <Select
                                defaultValue="all"
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                className="md:w-40! w-36!"
                            >
                                <Option value="all">All Categories</Option>
                                {categories.map((cat) => (
                                    <Option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                </Row>

                {/* ================= PRODUCT LIST ================= */}
                {loading && displayedProducts.length === 0 ? (
                    <div className="flex justify-center items-center py-32">
                        <AppSpin />
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <EmptyState
                        onReset={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                        }}
                    />
                ) : (
                    <ProductList products={displayedProducts} />
                )}

                {/* ================= LOAD MORE BUTTON / LOADING INDICATOR ================= */}
                <LoadMoreButton hasMore={hasMore} loading={loading} loadMore={loadMoreProducts} />
            </div>
            <WhatsAppFloat />
        </>
    );
}
