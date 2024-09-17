import { create } from "zustand";

interface ApiState {
   isOpen: boolean;
   setIsOpen: (to: boolean) => void;
}

export const useChatToggle = create<ApiState>((set) => ({
   isOpen: false,
   setIsOpen: (to) =>
      set(() => ({
         isOpen: to,
      })),
}));
