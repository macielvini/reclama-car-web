/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#FFF",
        layer: "#F3F3F3",
        "text-dark": "#333",
        "text-light": "#666",
        "accent-green": "#2A7221",
        "accent-yellow": "#E9C46A",
      },
      spacing: {
        "super-relation": "4px",
        "close-relation": "8px",
        "normal-relation": "12px",
        relation: "16px",
        "no-relation": "32px",
      },
    },
  },
  plugins: [],
};
