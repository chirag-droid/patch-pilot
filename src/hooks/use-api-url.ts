import { create } from "zustand";

interface ApiState {
   url?: string;
   setApiURL: (to: string) => void;
}

export const useApiURL = create<ApiState>((set) => ({
   url: undefined,
   setApiURL: (to) => set(() => ({ url: to })),
}));
