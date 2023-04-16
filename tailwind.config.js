const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");
const { MAX_WIDTH } = require("./src/constants");

const BASE_FONT_SIZE = 16;
const round = (value) =>
  value
    .toFixed(4)
    .replace(/(\.\d+?)0+$/, "$1")
    .replace(/\.0$/, "");
const pxToRem = (px) => `${round(px / BASE_FONT_SIZE)}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: ["nprogress", "nprogress-peg", "nprogress-bar"],
  theme: {
    extend: {},

    fontSize: {
      xs: pxToRem(12),
      sm: pxToRem(14),
      base: pxToRem(16),
      lg: pxToRem(20),
      h3: pxToRem(24),
      h2: pxToRem(28),
      h1: pxToRem(32),
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif;"],
    },
    fontWeight: {
      normal: "400",
      semibold: "600",
      bold: "700",
    },
    textColor: {
      base: "rgb(var(--base-foreground) / <alpha-value>)",
      "base-invert": "rgb(var(--base-foreground-invert) / <alpha-value>)",
      dim: "rgb(var(--base-foreground-dim) / <alpha-value>)",
      highlight: "var(--base-highlight)",
    },
    boxShadowColor: {
      base: "rgb(var(--base-foreground) / <alpha-value>)",
      "base-invert": "rgb(var(--base-foreground-invert) / <alpha-value>)",
    },
    backgroundColor: {
      base: "rgb(var(--base-background) / <alpha-value>)",
      base1: "rgb(var(--base-background-level1) / <alpha-value>)",
      base2: "rgb(var(--base-background-level2) / <alpha-value>)",
      "base-invert": "rgb(var(--base-background-invert) / <alpha-value>)",
      "base-hover": "rgb(var(--base-background-level2) / <alpha-value>)",
      transparent: "transparent",
    },
    borderColor: ({ theme }) => theme("backgroundColor"),
    screens: {
      max: `${MAX_WIDTH}px`,
      mobile: "460px",
    },
    dropShadow: ({ theme }) => theme("backgroundColor"),
    maxWidth: ({ theme, breakpoints }) => breakpoints(theme("screens")),
    zIndex: {
      base: 20,
      modal: 40,
      confetti: 50,
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["carbon", "mdi", "gridicons", "bi"]),
    }),
  ],
};
