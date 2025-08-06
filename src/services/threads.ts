import { Message } from "@/app/components/ChatWindowStream";

export const getMessagesFromServer = async (threadId: string) => {
  return fetch(`/api/conversations/${threadId}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const messages: Message[] = data
          // Дополнительная фильтрация на уровне приложения
          .filter((msg) => msg.content && msg.content.trim() !== "")
          .map((msg) => {
            return {
              id: new Date(msg.timestamp).getTime(),
              text: msg.content,
              sender: msg.role === "assistant" ? "bot" : "user",
            };
          });
        return messages;
      } else {
        return [];
      }
    })
    .catch(() => {
      return [];
    });
};
