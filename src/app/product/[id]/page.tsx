import { getProductById, getRelatedProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const finalPrice = product.hasDiscount
        ? product.discountType === "flat"
            ? Math.round(product.price - (product.discountValue || 0))
            : Math.round(product.price - (product.price * (product.discountValue || 0)) / 100)
        : product.price;

    return {
        title: product.title,
        description: product.shortDescription?.substring(0, 160),
        openGraph: {
            title: product.title,
            description: product.shortDescription,
            images: [product.image],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.shortDescription,
            images: [product.image],
        },
        other: {
            "product:price:amount": String(finalPrice),
            "product:price:currency": "BDT",
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
        return null; // TypeScript narrowing - notFound() never returns but TS doesn't know
    }

    const relatedProducts = await getRelatedProducts(id);

    // Schema.org structured data for SEO
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: [product.image],
        description: product.shortDescription,
        brand: { "@type": "Brand", name: "Product Showcase" },
        offers: {
            "@type": "Offer",
            priceCurrency: "BDT",
            price: product.hasDiscount
                ? product.discountType === "flat"
                    ? Math.round(product.price - (product.discountValue || 0))
                    : Math.round(product.price - (product.price * (product.discountValue || 0)) / 100)
                : product.price,
            availability: product.status === "Out of Stock"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
        },
        aggregateRating: product.numReviews
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.numReviews,
            }
            : undefined,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
