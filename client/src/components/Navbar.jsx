import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router";
import { useTheme } from "../hooks/useTheme";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="navbar bg-primary text-primary-content sticky top-0 z-[10]">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Xush kelibsiz
        </Link>
      </div>
      <div className="flex-none">
        <button onClick={toggleTheme} className="btn btn-ghost">
          {theme === "light" ? (
            <>
              <MdDarkMode /> Tungi rejim
            </>
          ) : (
            <>
              <MdLightMode /> Kunduzgi rejim
            </>
          )}
        </button>
      </div>
    </div>
  );
};
