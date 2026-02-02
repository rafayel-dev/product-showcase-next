import { API_URL } from "../apiConstants";

export async function getCategories(): Promise<{ id: string; name: string }[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
