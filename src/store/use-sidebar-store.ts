import { create } from "zustand";

interface SidebarStore {
   isSidebarHidden: boolean;
   toggleSidebarVisibility: () => void;
}

// Create a Zustand store
export const useSidebarStore = create<SidebarStore>((set) => ({
   isSidebarHidden: false,
   // Function to toggle the visibility state
   toggleSidebarVisibility: () =>
      set((state) => ({ isSidebarHidden: !state.isSidebarHidden })),
}));

export const toggleSidebarVisibility = () => {
   useSidebarStore.getState().toggleSidebarVisibility();
};
