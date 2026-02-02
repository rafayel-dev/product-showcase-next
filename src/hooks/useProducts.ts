"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "@/types";
import { getProducts } from "@/lib/products/productsApi";

const initialLoadCount = 20;
const productsPerLoad = 10;

export const useProducts = (initialProducts?: Product[]) => {
  const [allProducts, setAllProducts] = useState<Product[]>(
    initialProducts || [],
  );
  const [displayedCount, setDisplayedCount] = useState(initialLoadCount);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Only fetch if no initial products provided
  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      const fetchAll = async () => {
        setLoading(true);
        const data = await getProducts();
        setAllProducts(data);
        setLoading(false);
      };
      fetchAll();
    }
  }, [initialProducts]);

  // Use useMemo for derived state instead of useEffect + setState
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.category === selectedCategory ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.shortDescription?.toLowerCase().includes(lower) ||
          p.tags?.some((t) => t.toLowerCase().includes(lower)),
      );
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory]);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(initialLoadCount);
  }, [searchQuery, selectedCategory]);

  const displayedProducts = useMemo(
    () => filteredProducts.slice(0, displayedCount),
    [filteredProducts, displayedCount],
  );

  const hasMore = displayedCount < filteredProducts.length;

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + productsPerLoad);
      setLoading(false);
    }, 500);
  }, [loading, hasMore]);

  return {
    displayedProducts,
    allProducts,
    setAllProducts,
    loading,
    hasMore,
    loadMoreProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
};
