/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./index.html"],
  theme: {
    screens: {
      xs: "320px",
      "2xs": "360px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1440px",
    },
    fontFamily: {
      brushScript: ["Brush Script MT", "cursive"],
      blippoFantasy: ["Blippo", "Fantasy"],
      bradleyHand: ["Bradley Hand", "cursive"],
      avenirMedium: ["Avenir Medium"],
    },
    extend: {
      colors: {
        primaryBlue: "#234697", //
        secondaryBlueLight: "#F4F2FF",
        secondaryBlue: "#84A7DF",
        textDarkBlue: "#2E076E",
        primaryGreen: "#7AB554", //#56e600
        powderBlue: "#cbd9f0",
        textGray: "#374151bf",
        textWhite: "#FFFFFF",
        textDarkWhite: "#f9fafa",
        textDarkWhiteHover: "#FFFFFF",
        textDarkWhiteBold: "#FFFFFF",
        primaryTextBlack: "#282B2F",
      },

      animation: {
        "ping-slow": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        skeleton: "skeleton 1.5s infinite linear",
      },
      keyframes: {
        skeleton: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "skeleton-gradient":
          "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
      },
      backgroundSize: {
        "200%": "200% 100%",
      },
    },
  },
  plugins: [],
};
