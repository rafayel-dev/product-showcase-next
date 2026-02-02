import { API_URL } from "../apiConstants";

export async function validateCoupon(code: string, orderAmount: number) {
  const res = await fetch(`${API_URL}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, orderAmount }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { valid: false, message: data.message || "Invalid coupon" };
  }
  return { ...data, valid: true };
}
