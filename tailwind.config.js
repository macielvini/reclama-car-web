/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        sm: "14px",
        base: "16px",
        subtitle: "20px",
        title: "24px",
      },
      colors: {
        background: "#FFF",
        layer: "#F3F3F3",
        "text-dark": "#333",
        "text-light": "#666",
        "accent-green": "#2A7221",
        "accent-yellow": "#E9C46A",
      },
      borderWidth: { 1: "1px" },
      spacing: {
        "super-relation": "4px",
        "close-relation": "8px",
        "normal-relation": "12px",
        relation: "16px",
        "no-relation": "32px",
        "body-padding": "24px",
        "header-padding": "88px",
      },
    },
  },
  plugins: [],
};
