import { BASE_URL, API_URL } from "../apiConstants";
import type { Slide } from "@/types";

export async function getSliders(): Promise<Slide[]> {
  try {
    const res = await fetch(`${API_URL}/sliders`, {
      next: { revalidate: 300 },
    });
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
