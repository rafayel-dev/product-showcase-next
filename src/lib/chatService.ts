import { API_URL } from "./apiConstants";

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
  try {
    const response = await fetch(`${API_URL}/chat/active`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, guestId }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("error getActiveChat", error);
    return null;
  }
};

export const sendMessage = async (
  text: string,
  userId?: string,
  guestId?: string,
): Promise<IChat | null> => {
  try {
    const response = await fetch(`${API_URL}/chat/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId, guestId }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("error sendMessage", error);
    return null;
  }
};

export const markAdminMessagesAsRead = async (
  chatId: string,
): Promise<void> => {
  try {
    await fetch(`${API_URL}/chat/read/${chatId}`, {
      method: "PUT",
    });
  } catch (error) {
    console.error("error marking messages as read", error);
  }
};
