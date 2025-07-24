module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{tsx,ts,js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glitchPulse: {
          "0%": { textShadow: "0 0 0 #0ff, 0 0 0 #f0f" },
          "20%": { textShadow: "2px 0 #0ff, -2px 0 #f0f" },
          "40%": { textShadow: "-2px 0 #0ff, 2px 0 #f0f" },
          "60%": { textShadow: "1px 0 #0ff, -1px 0 #f0f" },
          "80%": { textShadow: "-1px 0 #0ff, 1px 0 #f0f" },
          "100%": { textShadow: "0 0 0 #0ff, 0 0 0 #f0f" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.4s ease-out",
        glitch: "glitch 0.3s infinite",
        glitchPulse: "glitchPulse 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
  presets: [require("./src/ui/tailwind.config.js")],
};