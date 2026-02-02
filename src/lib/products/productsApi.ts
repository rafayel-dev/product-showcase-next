import { BASE_URL, API_URL } from "../apiConstants";
import type { Product, Review } from "@/types";

export const mapProduct = (item: Record<string, unknown>): Product => ({
  id: (item.id || item._id) as string,
  title: (item.productName || item.title) as string,
  sku: item.sku as string,
  image: item.imageUrl
    ? (item.imageUrl as string).startsWith("http")
      ? (item.imageUrl as string)
      : `${BASE_URL}${item.imageUrl}`
    : "https://placehold.co/600x400",
  imageUrls:
    (item.imageUrls as string[])?.map((url: string) =>
      url.startsWith("http") ? url : `${BASE_URL}${url}`,
    ) || [],
  price: item.price as number,
  shortDescription:
    ((item.specifications as Record<string, unknown>)
      ?.shortDescription as string) ||
    (item.description as string) ||
    "",
  longDescription:
    ((item.productDetails as Record<string, unknown>)
      ?.longDescription as string) || "",
  rating: item.rating !== undefined ? (item.rating as number) : 0,
  stock: item.stock as number,
  hasDiscount: item.hasDiscount as boolean,
  discountType: item.discountType as "flat" | "percentage",
  discountValue: item.discountValue as number,
  specifications: item.specifications as Product["specifications"],
  tags: item.tags as string[],
  category: item.category as string,
  status: item.status as string,
  productDetails: item.productDetails as Product["productDetails"],
  reviews: (item.reviews as Review[]) || [],
  numReviews:
    (item.numReviews as number) ||
    ((item.reviews as Review[]) ? (item.reviews as Review[]).length : 0),
});

export async function getProducts(
  page: number = 1,
  limit: number = 50,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/products?page=${page}&limit=${limit}&isPublished=true`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return (data.products || []).map(mapProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    return mapProduct(data);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getRelatedProducts(
  currentId: string,
  limit: number = 5,
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/products/${currentId}/related?limit=${limit}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch related products");
    }
    const data = await response.json();
    return data.map(mapProduct);
  } catch {
    return [];
  }
}

export async function createReview(
  productId: string,
  review: { rating: number; comment: string; name: string; orderId: string },
) {
  const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Review failed");
  }
  return await res.json();
}

export async function getProductReviews(
  productId: string,
  page: number = 1,
  limit: number = 6,
): Promise<Review[]> {
  try {
    const res = await fetch(
      `${API_URL}/products/${productId}/reviews?page=${page}&limit=${limit}`,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
