import { API_URL } from "../apiConstants";

export async function getCategories(): Promise<{ id: string; name: string }[]> {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: Record<string, unknown>) => ({
      id: item.id as string,
      name: item.name as string,
    }));
  } catch {
    return [];
  }
}
