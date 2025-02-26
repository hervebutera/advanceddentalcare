/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Pages/**/*.html',
    './index.html',
  ],
  theme: {
    screens: {
        xs: "320px",
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

        primaryBlue: "#56e600",//#6f16eb
        secondaryBlueLight: "#F4F2FF",
        textDarkBlue: "#2E076E",
        primaryGreen: "#56e600",
        powderBlue: "#cbd9f0", 
        textGray: "#374151bf", 
        textWhite: "#FFFFFF", 
        textDarkWhite: "#f9fafa", 
        textDarkWhiteHover: "#FFFFFF", 
        textDarkWhiteBold: "#FFFFFF", 
        primaryTextBlack: "#282B2F", 
      },
        
      animation: {
          'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    } 
  },
  plugins: [],
}
