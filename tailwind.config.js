import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "wdc-blue": "#1fcedd",
      },
      backgroundImage: {
        paper: "url('/static/so-white.png')",
        space: "url('/static/so-black.png')",
        plus: "url('/static/plus.svg')",
      },
    },
  },
  plugins: [daisyui],
};
