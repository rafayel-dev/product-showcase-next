"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { CartItem, Product, Review } from "@/types";
import ProductList from "@/components/features/Product/ProductList";
import {
    Image as AntImage,
    Typography,
    Rate,
    Row,
    Col,
    Space,
    Tag,
    Radio,
    Divider,
    Popover,
    Form,
} from "antd";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import {
    MinusOutlined,
    PlusOutlined,
    WhatsAppOutlined,
    ShareAltOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import toast from "@/utils/toast";
import { createReview, getProductReviews } from "@/lib/api";
import FloatingChat from "@/components/FloatingChat/FloatingChat";

const { Title, Text, Paragraph } = Typography;

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailClient({
    product: initialProduct,
    relatedProducts,
}: ProductDetailClientProps) {
    const router = useRouter();
    const { addToCart, cartItems } = useCart();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [product, setProduct] = useState<Product>(initialProduct);
    const [reviews, setReviews] = useState<Review[]>(initialProduct.reviews || []);
    const [form] = Form.useForm();
    const [selectedImage, setSelectedImage] = useState(initialProduct.image);
    const [size, setSize] = useState(
        initialProduct.specifications?.availableSizes?.[0] || "M"
    );
    const [color, setColor] = useState(
        initialProduct.specifications?.availableColors?.[0] || "Default"
    );
    const [qty, setQty] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [hasMoreReviews, setHasMoreReviews] = useState(true);

    const hasDiscount = !!product.hasDiscount;
    const finalPrice = product.hasDiscount
        ? product.discountType === "flat"
            ? Math.round(product.price - (product.discountValue || 0))
            : Math.round(product.price - (product.price * (product.discountValue || 0)) / 100)
        : product.price;

    useEffect(() => {
        if (product.reviews) {
            setReviews(product.reviews);
            setPage(1);
            if (product.numReviews && product.reviews.length >= product.numReviews) {
                setHasMoreReviews(false);
            } else {
                setHasMoreReviews(true);
            }
        }
    }, [product]);

    const loadMoreReviews = async () => {
        if (loadingReviews || !hasMoreReviews) return;

        setLoadingReviews(true);
        try {
            const nextPage = page + 1;
            const more = await getProductReviews(product.id, nextPage, 6);

            if (more.length > 0) {
                setReviews((prev) => {
                    const existingIds = new Set(prev.map((r) => r._id || r.name + r.date));
                    const uniqueMore = more.filter(
                        (r) => !existingIds.has(r._id || r.name + r.date)
                    );
                    return [...prev, ...uniqueMore];
                });
                setPage(nextPage);
                if (more.length < 6) setHasMoreReviews(false);
            } else {
                setHasMoreReviews(false);
            }
        } catch (err) {
            console.error("Failed to load more reviews", err);
        } finally {
            setLoadingReviews(false);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize: size,
            selectedColor: color,
            quantity: qty,
            price: finalPrice,
        } as CartItem);
        toast.success("পণ্য কার্টে যোগ হয়েছে 🛒");
    };

    const handleBuyNow = () => {
        const isInCart = cartItems.some(
            (item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
        );

        if (!isInCart) {
            handleAddToCart();
        }
        router.push("/checkout");
    };

    interface ReviewFormValues {
        name: string;
        orderId: string;
        rating: number;
        comment: string;
    }

    const handleReviewSubmit = async (values: ReviewFormValues) => {
        try {
            setSubmittingReview(true);

            await createReview(product.id, {
                name: values.name,
                orderId: values.orderId,
                rating: values.rating,
                comment: values.comment,
            });

            const newReview: Review = {
                name: values.name,
                orderId: values.orderId,
                rating: values.rating,
                comment: values.comment,
                date: new Date().toLocaleDateString(),
            };

            const newReviewsList = [newReview, ...reviews];
            const newNumReviews = newReviewsList.length;
            const newRating =
                newReviewsList.reduce((acc, item) => acc + item.rating, 0) / newNumReviews;

            setProduct({
                ...product,
                reviews: newReviewsList,
                numReviews: newNumReviews,
                rating: newRating,
            });

            toast.success("আপনার রিভিউটি সাবমিট হয়েছে ❤️");
            form.resetFields();
            setShowReviewForm(false);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "রিভিউ দিতে সমস্যা হয়েছে";
            toast.error(errorMessage);
        } finally {
            setSubmittingReview(false);
        }
    };

    const whatsappOrder = () => {
        const msg = `Hello, আমি এই পণ্যটি অর্ডার করতে চাই 👇

Product: ${product.title}
SKU: ${product.sku}
Size: ${size}
Color: ${color}
Quantity: ${qty}
Price: ৳${finalPrice * qty}
`;
        window.open(
            `https://wa.me/8801751876070?text=${encodeURIComponent(msg)}`,
            "_blank"
        );
    };

    const productUrl = typeof window !== "undefined" ? window.location.href : "";
    const productTitle = product.title;

    const shareFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
            "_blank"
        );
    };

    const shareTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(productUrl)}`,
            "_blank"
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(productUrl);
            toast.success("Product link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy link.");
            console.error("Failed to copy: ", err);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount =
                container.clientWidth /
                (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);

            if (direction === "left") {
                if (container.scrollLeft <= 10) {
                    container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
                }
            } else {
                const remainingScroll =
                    container.scrollWidth - (container.scrollLeft + container.clientWidth);
                if (remainingScroll <= 10) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }
    };

    const shareContent = (
        <Space orientation="vertical">
            <AppButton
                type="text"
                icon={<FaFacebook style={{ color: "#1877f2" }} />}
                onClick={shareFacebook}
            >
                Share on Facebook
            </AppButton>
            <AppButton
                type="text"
                icon={<FaTwitter style={{ color: "#1da1f2" }} />}
                onClick={shareTwitter}
            >
                Share on Twitter
            </AppButton>
            <AppButton type="text" icon={<ShareAltOutlined />} onClick={copyLink}>
                Copy Link
            </AppButton>
        </Space>
    );

    return (
        <>
            <div className="min-h-screen p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <Row gutter={[32, 32]}>
                        {/* IMAGES */}
                        <Col xs={24} md={12}>
                            <AppCard bordered={false}>
                                <div className="relative">
                                    <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                                        <Image
                                            src={selectedImage}
                                            alt={product.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    {hasDiscount && (
                                        <div className="absolute top-2 left-2 bg-violet-600/70 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito z-10">
                                            🔥
                                            {product.discountType === "flat"
                                                ? `৳${product.discountValue} Off`
                                                : `${product.discountValue}% Off`}
                                        </div>
                                    )}
                                </div>

                                <Space className="mt-4" wrap>
                                    {(product.imageUrls && product.imageUrls.length > 0
                                        ? product.imageUrls
                                        : [product.image]
                                    ).map((img, i) => (
                                        <AntImage
                                            key={i}
                                            src={img}
                                            width={70}
                                            preview={false}
                                            onClick={() => setSelectedImage(img)}
                                            className={`cursor-pointer rounded aspect-square object-cover ${selectedImage === img ? "border-2 border-violet-500" : ""
                                                }`}
                                        />
                                    ))}
                                </Space>
                            </AppCard>
                        </Col>

                        {/* DETAILS */}
                        <Col xs={24} md={12}>
                            <AppCard bordered={false}>
                                <Title level={2}>{product.title}</Title>
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Rate
                                            disabled
                                            allowHalf
                                            value={product.rating}
                                            className="text-xs! sm:text-sm! md:text-base!"
                                        />

                                        <a href="#review">
                                            <Text
                                                type="secondary"
                                                className="text-xs md:text-sm cursor-pointer hover:underline"
                                            >
                                                ({product.numReviews || 0} Reviews)
                                            </Text>
                                        </a>

                                        <Popover content={shareContent} trigger="click" placement="bottom">
                                            <span className="hover:text-violet-600 text-xs md:text-sm cursor-pointer transition-all duration-300 flex items-center gap-1">
                                                <ShareAltOutlined />
                                                Share
                                            </span>
                                        </Popover>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {hasDiscount ? (
                                            <>
                                                <Title level={4} className="text-red-500! m-0! md:text-2xl!">
                                                    ৳{finalPrice}
                                                </Title>
                                                <Text delete type="secondary" className="text-sm">
                                                    ৳{product.price}
                                                </Text>
                                            </>
                                        ) : (
                                            <Title level={4} className="text-red-500! m-0! md:text-2xl!">
                                                ৳{product.price}
                                            </Title>
                                        )}
                                    </div>
                                </div>

                                <Space wrap className="my-3">
                                    <Tag color="blue">Fast Delivery</Tag>
                                    <Tag color="gold">Original Product</Tag>
                                    {product.status === "Out of Stock" ? (
                                        <Tag color="red" className="font-bold">
                                            Out of Stock
                                        </Tag>
                                    ) : product.status === "Discontinued" ? (
                                        <Tag color="default" className="font-bold">
                                            Discontinued
                                        </Tag>
                                    ) : (
                                        <Tag color="green" className="font-bold">
                                            In Stock
                                        </Tag>
                                    )}
                                </Space>

                                <Paragraph>{product.shortDescription}</Paragraph>

                                {product.tags && product.tags.length > 0 && (
                                    <div className="mb-4">
                                        {product.tags.map((tag) => (
                                            <Tag key={tag} className="mr-1!">
                                                #{tag}
                                            </Tag>
                                        ))}
                                    </div>
                                )}

                                <Divider />

                                {/* VARIANTS */}
                                <Space orientation="vertical" size="middle">
                                    {product.specifications?.availableSizes &&
                                        product.specifications.availableSizes.length > 0 && (
                                            <div>
                                                <Text strong>Size: </Text>
                                                <Radio.Group
                                                    className="ml-2!"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                >
                                                    {product.specifications.availableSizes.map((s) => (
                                                        <Radio.Button
                                                            key={s}
                                                            value={s}
                                                            className={`text-violet-500! hover:border-violet-500! ${size === s ? "border-violet-500!" : ""
                                                                }`}
                                                        >
                                                            {s}
                                                        </Radio.Button>
                                                    ))}
                                                </Radio.Group>
                                            </div>
                                        )}

                                    {product.specifications?.availableColors &&
                                        product.specifications.availableColors.length > 0 && (
                                            <div>
                                                <Text strong>Color: </Text>
                                                <Radio.Group
                                                    className="ml-2!"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                >
                                                    {product.specifications.availableColors.map((c) => (
                                                        <Radio.Button
                                                            key={c}
                                                            value={c}
                                                            className={`text-violet-500! hover:border-violet-500! ${color === c ? "border-violet-500!" : ""
                                                                }`}
                                                        >
                                                            {c}
                                                        </Radio.Button>
                                                    ))}
                                                </Radio.Group>
                                            </div>
                                        )}

                                    <div className="mb-6">
                                        <Text strong>Quantity:</Text>
                                        <Space className="ml-2!">
                                            <AppButton
                                                className="text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                                                icon={<MinusOutlined />}
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                            />
                                            <Text>{qty}</Text>
                                            <AppButton
                                                className="text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                                                icon={<PlusOutlined />}
                                                onClick={() => setQty(Math.min(10, qty + 1))}
                                            />
                                        </Space>
                                    </div>
                                </Space>

                                {/* ACTION BUTTONS */}
                                <Space orientation="vertical" className="w-full">
                                    <AppButton
                                        size="large"
                                        className="text-lg! text-violet-500! hover:text-violet-600! hover:border-violet-500!"
                                        block
                                        disabled={
                                            product.status === "Out of Stock" ||
                                            product.status === "Discontinued"
                                        }
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </AppButton>

                                    <AppButton
                                        size="large"
                                        type="primary"
                                        block
                                        className="text-lg!"
                                        disabled={
                                            product.status === "Out of Stock" ||
                                            product.status === "Discontinued"
                                        }
                                        onClick={handleBuyNow}
                                    >
                                        Buy Now
                                    </AppButton>

                                    <AppButton
                                        size="large"
                                        block
                                        icon={<WhatsAppOutlined />}
                                        className="bg-green-500! text-white! hover:bg-green-600! border-none! text-lg!"
                                        onClick={whatsappOrder}
                                    >
                                        Order via WhatsApp
                                    </AppButton>
                                </Space>
                            </AppCard>
                        </Col>
                    </Row>

                    {/* ================= FULL PRODUCT DETAILS ================= */}
                    <div className="mt-12">
                        <AppCard bordered={false}>
                            <Title level={3}>📄 Product Details</Title>
                            <Divider />

                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={14}>
                                    <Title level={4}>Short Description</Title>
                                    <Paragraph className="text-gray-700 leading-relaxed">
                                        {product.shortDescription ||
                                            "এই পণ্যটি দৈনন্দিন ব্যবহারের জন্য উপযুক্ত। উন্নত মানের ম্যাটেরিয়াল দিয়ে তৈরি, যা দীর্ঘদিন টেকসই থাকবে।"}
                                    </Paragraph>

                                    {product.productDetails?.features &&
                                        product.productDetails.features.length > 0 ? (
                                        <div className="mt-4">
                                            <Title level={5}>Key Features:</Title>
                                            <ul className="list-disc list-inside text-gray-700">
                                                {product.productDetails.features.map((feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Paragraph className="text-gray-700">
                                            ✔ 100% Original Product
                                            <br />
                                            ✔ Quality Checked
                                            <br />✔ বাংলাদেশে দ্রুত ডেলিভারি
                                        </Paragraph>
                                    )}
                                </Col>

                                <Col xs={24} md={10}>
                                    <Title level={4}>Specifications</Title>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                            <Text strong className="text-gray-700!" type="secondary">
                                                Brand
                                            </Text>
                                            <Text>{product.specifications?.brand || "—"}</Text>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                            <Text strong className="text-gray-700!" type="secondary">
                                                Available Sizes
                                            </Text>
                                            <Text>
                                                {product.specifications?.availableSizes?.join(", ") || "—"}
                                            </Text>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                            <Text strong className="text-gray-700!" type="secondary">
                                                Available Colors
                                            </Text>
                                            <Text>
                                                {product.specifications?.availableColors?.join(", ") || "—"}
                                            </Text>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                            <Text strong className="text-gray-700!" type="secondary">
                                                Material
                                            </Text>
                                            <Text>{product.specifications?.material || "—"}</Text>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-2">
                                            <Text strong className="text-gray-700!" type="secondary">
                                                Country of Origin
                                            </Text>
                                            <Text>{product.specifications?.countryOfOrigin || "—"}</Text>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Divider />

                            <Col xs={24} md={24}>
                                <Title level={4}>Description</Title>
                                <div
                                    className="text-gray-700 leading-relaxed rich-text-content"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            product.longDescription ||
                                            "এই পণ্যটি দৈনন্দিন ব্যবহারের জন্য উপযুক্ত। উন্নত মানের ম্যাটেরিয়াল দিয়ে তৈরি, যা দীর্ঘদিন টেকসই থাকবে।",
                                    }}
                                />
                            </Col>

                            <Divider />

                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <Title level={4}>🚚 Delivery Information</Title>
                                    <Paragraph className="whitespace-pre-line">
                                        {product.productDetails?.deliveryInfo ||
                                            `• ঢাকা শহরের ভিতরে: 1–2 কর্মদিবস
• ঢাকার বাইরে: 2–4 কর্মদিবস
• Cash on Delivery available`}
                                    </Paragraph>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Title level={4}>↩ Return Policy</Title>
                                    <Paragraph className="whitespace-pre-line">
                                        {product.productDetails?.returnPolicy ||
                                            `• ৭ দিনের মধ্যে রিটার্ন সুবিধা
• পণ্য ব্যবহার না করা থাকতে হবে
• রিটার্ন চার্জ প্রযোজ্য হতে পারে`}
                                    </Paragraph>
                                </Col>
                            </Row>

                            <Divider />

                            {/* ================= CUSTOMER REVIEWS ================= */}
                            <div className="flex justify-between items-center">
                                <Title id="review" level={4}>
                                    ⭐ Customer Reviews
                                </Title>
                                {reviews.length > 0 && (
                                    <div className="flex gap-2">
                                        <AppButton
                                            className="hidden sm:flex bg-white/80 backdrop-blur-sm shadow-md border border-gray-100! hover:bg-violet-50! hover:text-violet-600! hover:border-violet-200!"
                                            shape="circle"
                                            icon={<LeftOutlined />}
                                            onClick={() => scroll("left")}
                                        />
                                        <AppButton
                                            className="hidden sm:flex bg-white/80 backdrop-blur-sm shadow-md border border-gray-100! hover:bg-violet-50! hover:text-violet-600! hover:border-violet-200!"
                                            shape="circle"
                                            icon={<RightOutlined />}
                                            onClick={() => scroll("right")}
                                        />
                                    </div>
                                )}
                            </div>

                            {reviews.length === 0 ? (
                                <Paragraph type="secondary">
                                    এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!
                                </Paragraph>
                            ) : (
                                <div className="relative group">
                                    <div
                                        ref={scrollContainerRef}
                                        className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                                        onScroll={(e) => {
                                            const target = e.currentTarget;
                                            if (
                                                target.scrollLeft + target.clientWidth >=
                                                target.scrollWidth - 50
                                            ) {
                                                loadMoreReviews();
                                            }
                                        }}
                                    >
                                        {reviews.map((review, index) => (
                                            <div
                                                key={index}
                                                className="snap-center shrink-0 w-[81vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] h-full"
                                            >
                                                <AppCard
                                                    className="bg-gray-50 h-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                                    bordered={false}
                                                >
                                                    <Space orientation="vertical" size="small" className="w-full">
                                                        <div className="flex flex-wrap items-center justify-between gap-1 w-full">
                                                            <Text
                                                                strong
                                                                className="text-sm wrap-break-word whitespace-normal capitalize"
                                                            >
                                                                {review.name}
                                                            </Text>
                                                            {review.orderId && (
                                                                <Tag
                                                                    color="purple"
                                                                    className="text-[10px]! m-0! border-0 bg-violet-50 text-violet-600"
                                                                >
                                                                    #{review.orderId}
                                                                </Tag>
                                                            )}
                                                        </div>
                                                        <Rate
                                                            disabled
                                                            value={review.rating}
                                                            className="text-xs! text-amber-400"
                                                        />
                                                        <Paragraph className="mb-0! text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                                                            {review.comment}
                                                        </Paragraph>
                                                        <Text
                                                            type="secondary"
                                                            className="text-xs block text-right mt-2"
                                                        >
                                                            {new Date(review.date).toLocaleDateString()}
                                                        </Text>
                                                    </Space>
                                                </AppCard>
                                            </div>
                                        ))}

                                        {loadingReviews && (
                                            <div className="shrink-0 w-[50px] flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-600"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <Divider />

                            {/* ================= REVIEW FORM ================= */}
                            {!showReviewForm ? (
                                <div className="mt-6 flex justify-center items-center gap-2 flex-col">
                                    <Text>আপনার মতামত লিখুন</Text>
                                    <AppButton
                                        className="w-1/2 md:w-auto"
                                        type="primary"
                                        onClick={() => setShowReviewForm(true)}
                                    >
                                        Write a Review
                                    </AppButton>
                                </div>
                            ) : (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-4 max-w-lg">
                                        <Title level={5} className="m-0!">
                                            ✍️ Write a Review
                                        </Title>
                                        <AppButton
                                            type="text"
                                            danger
                                            onClick={() => setShowReviewForm(false)}
                                        >
                                            Cancel
                                        </AppButton>
                                    </div>

                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleReviewSubmit}
                                        className="max-w-lg"
                                    >
                                        <Form.Item
                                            label="Your Name"
                                            name="name"
                                            rules={[{ required: true, message: "নাম লিখুন" }]}
                                        >
                                            <AppInput placeholder="আপনার নাম" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Order ID"
                                            name="orderId"
                                            rules={[{ required: true, message: "Order ID দিন" }]}
                                        >
                                            <AppInput placeholder="যে Order ID দিয়ে কিনেছেন" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Rating"
                                            name="rating"
                                            rules={[{ required: true, message: "Rating দিন" }]}
                                        >
                                            <Rate />
                                        </Form.Item>

                                        <Form.Item
                                            label="Your Review"
                                            name="comment"
                                            rules={[{ required: true, message: "রিভিউ লিখুন" }]}
                                        >
                                            <AppInput.TextArea rows={4} placeholder="পণ্যের অভিজ্ঞতা লিখুন..." />
                                        </Form.Item>

                                        <AppButton
                                            type="primary"
                                            htmlType="submit"
                                            loading={submittingReview}
                                            disabled={submittingReview}
                                        >
                                            Submit Review
                                        </AppButton>
                                    </Form>
                                </div>
                            )}
                        </AppCard>
                    </div>

                    {/* ================= RELATED PRODUCTS ================= */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-12">
                            <Title level={3}>Related Products</Title>
                            <Divider />
                            <ProductList products={relatedProducts} />
                        </div>
                    )}
                </div>
            </div>
            <FloatingChat />
        </>
    );
}
