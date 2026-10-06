/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        surface: "#1a1a1a",
        border: "#2a2a2a",
        muted: "#666666",
        subtle: "#999999",
        text: "#f5f5f5",
        accent: "#60a5fa", // 차분한 블루
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
