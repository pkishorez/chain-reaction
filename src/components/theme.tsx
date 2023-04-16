import { useThemeStore } from "./use-theme";
import clsx from "clsx";

export const Theme = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <button
      className="flex items-center p-2"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <span
        className={clsx({
          "i-bi-sun-fill": theme === "dark",
          "i-bi-sun": theme === "light",
        })}
      />
    </button>
  );
};
