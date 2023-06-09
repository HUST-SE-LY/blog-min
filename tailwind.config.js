/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        chatIn: {
          from: {
            transform: "translateY(16px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
      },
      animation: {
        chatIn: "chatIn 0.1s forwards ease-in"
      }
    },
  },
  plugins: [],
};
