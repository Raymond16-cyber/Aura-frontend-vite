import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    // check localStorage first
    const savedTheme = localStorage.getItem("aura-theme");
    return savedTheme === "dark"; // default to light if null
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("aura-theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  // Apply theme on first load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
  }, []);

  return { theme, toggleTheme };
}
