/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideTop: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(-10%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        popUp: {
          "0%, 100%": { opacity: 0, transform: "translateY(-50%)" },
          "10%, 90%": { opacity: 1, transform: "translateY(0)" },
        },
        spawnCell: {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        selectCell: {
          "0%, 100%": { transform: "translateY(-1%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        appear: "appear 250ms ease-in-out 1",
        slideTop: "slideTop 300ms ease-in-out 1",
        slideLeft: "slideLeft 500ms ease-in-out 1",
        popUp: "popUp 4500ms ease-in-out 1",
        spawnCell: "spawnCell 3s ease-in-out 1",
        selectCell: "selectCell 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
