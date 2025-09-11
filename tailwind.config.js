/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
     
      dropShadow: {
        glow: "0 0 10px #FFD700",
      },
      colors: {
        "gold-color": "#64b1b8",
        "dark-color": "black",
        background: "#ffffff",
        "text-color": "#64b1b8",
        "gray-color": "#f2f0ef",
        "border-color-green" : "8#64b1b"
      },
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(circle, rgb(50 125 224) 0%, rgb(0, 0, 20) 50%)",
      },
    },
    animation: {
      "gradient-x": "gradient-x 5s ease infinite",
    },
    keyframes: {
      "gradient-x": {
        "0%, 100%": {
          "background-position": "0% 50%",
        },
        "50%": {
          "background-position": "100% 50%",
        },
      },
    },
  },
  plugins: [],
};