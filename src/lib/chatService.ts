import { API_URL } from "./api";

export interface IMessage {
  sender: "user" | "admin";
  text: string;
  createdAt: string;
  isRead?: boolean;
}

export interface IChat {
  _id: string;
  messages: IMessage[];
  guestId?: string;
  user?: string;
}

export const getActiveChat = async (
  userId?: string,
  guestId?: string,
): Promise<IChat | null> => {
  const response = await fetch(`${API_URL}/chat/active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, guestId }),
  });
  if (!response.ok) return null;
  return response.json();
};

export const sendMessage = async (
  text: string,
  userId?: string,
  guestId?: string,
): Promise<IChat> => {
  const response = await fetch(`${API_URL}/chat/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId, guestId }),
  });
  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
};

export const markAdminMessagesAsRead = async (
  chatId: string,
): Promise<void> => {
  await fetch(`${API_URL}/chat/read/${chatId}`, {
    method: "PUT",
  });
};
