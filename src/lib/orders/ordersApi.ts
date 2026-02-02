import { API_URL } from "../apiConstants";

export async function createOrder(orderPayload: unknown) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to place order");
  }
  return data;
}

export async function getInvoiceBlob(orderId: string): Promise<Blob> {
  const res = await fetch(`${API_URL}/orders/${orderId}/invoice`);
  if (!res.ok) throw new Error("Failed to download invoice");
  return await res.blob();
}
