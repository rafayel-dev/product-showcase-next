import { BASE_URL, API_URL } from "../apiConstants";
import type { Slide } from "@/types";

export interface MarqueeData {
  text: string;
  isActive: boolean;
}

export async function getSliders(): Promise<Slide[]> {
  try {
    const res = await fetch(`${API_URL}/sliders`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: Record<string, unknown>) => ({
      image: (item.image as string).startsWith("http")
        ? item.image
        : `${BASE_URL}${item.image}`,
      alt: (item.title as string) || "Slider Image",
      link: item.link as string,
    }));
  } catch {
    return [];
  }
}

export async function getMarquee(): Promise<MarqueeData> {
  try {
    const res = await fetch(`${API_URL}/settings/marquee`, {
      next: { revalidate: 60 },
    }); // Add revalidation
    if (!res.ok) return { text: "", isActive: true };
    const data = await res.json();

    if (data && data.value) {
      return data.value;
    } else if (data) {
      return {
        text: data.text || "",
        isActive: data.isActive !== undefined ? data.isActive : true,
      };
    }
    return { text: "", isActive: true };
  } catch (error) {
    console.error("Failed to fetch marquee settings", error);
    return { text: "", isActive: true };
  }
}
