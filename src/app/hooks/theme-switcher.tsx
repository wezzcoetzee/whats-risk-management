"use client";

import { useEffect } from "react";
import { setTheme } from "../utils/theme-manager";

export default function ThemeSwitcher() {
  useEffect(() => {
    setTheme();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
