import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils/functions";
import { useEffect } from "react";

const useStore = create((set) => ({
  theme: getLocalStorage("mytheme") || "light",
  setTheme: (theme) =>
    set((state) => {
      setLocalStorage("mytheme", theme);
      document.getElementById("root").setAttribute("data-theme", theme);
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
        document.getElementById("root").setAttribute("data-theme", "dark");
        return {
          ...state,
          theme: "dark",
        };
      } else {
        setLocalStorage("mytheme", "light");
        document.getElementById("root").setAttribute("data-theme", "light");
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
