import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  theme: "dark" | "light";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<State>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-store", // name of the item in the storage (must be unique)
    }
  )
);
