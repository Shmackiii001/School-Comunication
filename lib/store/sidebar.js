import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpen: true, // default state
  toggle: () => set((state) => ({ isOpen: !state.isOpen })), // toggler
  open: () => set({ isOpen: true }), // optional helper
  close: () => set({ isOpen: false }), // optional helper
}));
