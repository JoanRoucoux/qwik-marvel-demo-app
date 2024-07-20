/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#e62429",
          "primary-content": "#e0e0e0",
          "base-100": "#191919",
          "base-200": "#0c0c0c",
          "base-300": "#000000",
          "base-content": "#e0e0e0",
          "neutral-content": "#e0e0e0",
        },
      },
    ],
  },
};
