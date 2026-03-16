import { create } from 'zustand';

interface WishlistStore {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggle: (id) => set((state) => ({
    items: state.items.includes(id) ? state.items.filter(i => i !== id) : [...state.items, id],
  })),
  has: (id) => get().items.includes(id),
}));
