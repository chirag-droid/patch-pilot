import { create } from "zustand";

interface ApiState {
   url?: string;
   setApiURL: (to: string | undefined) => void;
}

export const useApiURL = create<ApiState>((set) => ({
   url: undefined,
   setApiURL: (to) => set(() => ({ url: to })),
}));
