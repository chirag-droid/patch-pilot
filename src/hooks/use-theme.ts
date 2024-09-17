import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const store = combine(
   {
      theme: "rose",
      dark: true,
   },
   (set) => ({
      changeTheme: (to: string) => set({ theme: to }),
      toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
   })
);

// Create Zustand store
export const useThemeStore = create(
   persist(store, {
      version: 1,
      name: "theme-settings",
   })
);
