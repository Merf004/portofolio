/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 👈 important pour le toggle thème
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        primary: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
        },
        accent: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.6s ease forwards",
        "slide-up":   "slideUp 0.6s ease forwards",
        "slide-down": "slideDown 0.6s ease forwards",
        "typing":     "typing 3s steps(30) infinite",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp:   { "0%": { opacity: 0, transform: "translateY(30px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: 0, transform: "translateY(-30px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        typing:    { "0%": { width: 0 }, "100%": { width: "100%" } },
      },
    },
  },
  plugins: [],
}