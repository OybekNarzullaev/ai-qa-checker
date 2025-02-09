import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils/functions";
import { useEffect } from "react";

const useStore = create((set) => ({
  theme: getLocalStorage("mytheme") || "light",
  setTheme: (theme) =>
    set((state) => {
      setLocalStorage("mytheme", theme);
      document.documentElement.setAttribute("data-mytheme", theme);
      return {
        ...state,
        theme,
      };
    }),
  toggleTheme: () =>
    set((state) => {
      const prevTheme = getLocalStorage("mytheme") || "light";
      if (prevTheme === "light") {
        setLocalStorage("mytheme", "dark");
        document.documentElement.setAttribute("data-mytheme", "dark");
        return {
          ...state,
          theme: "dark",
        };
      } else {
        setLocalStorage("mytheme", "light");
        document.documentElement.setAttribute("data-mytheme", "light");
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
