import { BASE_URL } from "../apiConstants";

export async function getSettings(key: string): Promise<unknown> {
  try {
    const res = await fetch(`${BASE_URL}/api/settings/${key}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
