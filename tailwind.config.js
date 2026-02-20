/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AI Section Colors (Purple/Indigo)
        ai: {
          main: "#a855f7", // Purple-500
          dark: "#581c87", // Purple-900
          glow: "#d8b4fe",
        },
        // Gaming Section Colors (Neon Green/Black)
        gaming: {
          main: "#00ff9d", // Neon Green
          dark: "#0a0a0a", // Almost Black
          accent: "#ff0055", // Cyberpunk Red
        },
        // Fullstack Section Colors (Blue/Slate)
        tech: {
          main: "#3b82f6", // Blue-500
          dark: "#1e293b", // Slate-800
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};