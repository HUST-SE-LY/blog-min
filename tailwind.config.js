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
        comeInFromRight: {
          from: {
            transform: "translateX(100px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0px)",
            opacity: "1",
          }
        },
        comeInFromLeft: {
          from: {
            transform: "translateX(-100px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0px)",
            opacity: "1",
          }
        },
        floating: {
          "0%": {
            transform: "translateY(0px)",
          },
          "25%": {
            transform: "translateY(10px)"
          },
          "75%": {
            transform: "translateY(-10px)"
          },
          "100%": {
            transform: "translateY(0px)",
          }
        }
        
        
      },
      animation: {
        chatIn: "chatIn 0.1s forwards ease-in",
        comeInFromRight: "comeInFromRight 0.5s forwards ease-in 0s, floating 5s ease-in-out infinite 0.5s",
        comeInFromLeft: "comeInFromLeft 0.5s forwards ease-in 0s, floating 5s ease-in-out infinite 0.5s",
      }
    },
  },
  plugins: [],
};
