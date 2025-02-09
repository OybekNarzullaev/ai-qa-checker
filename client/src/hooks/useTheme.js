import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils/functions";
import { useEffect } from "react";

const useStore = create((set) => ({
  theme: getLocalStorage("theme") || "light",
  setTheme: (theme) =>
    set((state) => {
      setLocalStorage("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return {
        ...state,
        theme,
      };
    }),
  toggleTheme: () =>
    set((state) => {
      const prevTheme = getLocalStorage("theme") || "light";
      if (prevTheme === "light") {
        setLocalStorage("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        return {
          ...state,
          theme: "dark",
        };
      } else {
        setLocalStorage("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        return {
          ...state,
          theme: "light",
        };
      }
    }),
}));

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useStore((state) => state);

  useEffect(() => {
    setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { theme, toggleTheme };
};
