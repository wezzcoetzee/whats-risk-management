export const getCurrentTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return import("../styles/dark-theme").then((module) => module.default);
  } else {
    return import("../styles/light-theme").then((module) => module.default);
  }
};

export const setTheme = async () => {
  const theme = await getCurrentTheme();
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme.themeColor);
};
