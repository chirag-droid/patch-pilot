import { create } from "zustand";

export interface Message {
   id: string;
   content: string;
   sender: "user" | "ai";
   timestamp: string;
}

const initialChatSupportMessages: Message[] = [
   {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
   },
];

interface MessageStore {
   messages: Message[];
   addMessage: (message: Message) => void;
   addResponse: (message: string) => void;
}

export const useMessagesStore = create<MessageStore>((set) => ({
   messages: initialChatSupportMessages,
   addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
   addResponse: (message) =>
      set((state) => ({
         messages: [
            ...state.messages,
            {
               id: Date.now().toString(),
               content: message,
               sender: "ai",
               timestamp: new Date().toLocaleTimeString(),
            },
         ],
      })),
}));
