module.exports = {
  // ...

  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(0, 20, 25)",
          100: "rgb(0, 40, 50)",
          200: "rgb(0, 80, 100)",
          300: "rgb(0, 120, 150)",
          400: "rgb(0, 160, 200)",
          500: "rgb(80, 100, 220)",
          600: "rgb(120, 60, 240)",
          700: "rgb(163, 67, 255)",
          800: "rgb(210, 40, 230)",
          900: "rgb(255, 120, 230)",
        },
        neutral: {
          0: "rgb(0, 0, 0)",
          50: "rgb(10, 10, 10)",
          100: "rgb(15, 15, 15)",
          200: "rgb(25, 25, 25)",
          300: "rgb(40, 40, 40)",
          400: "rgb(70, 70, 70)",
          500: "rgb(110, 110, 110)",
          600: "rgb(150, 150, 150)",
          700: "rgb(190, 190, 190)",
          800: "rgb(225, 225, 225)",
          900: "rgb(245, 245, 245)",
          950: "rgb(255, 255, 255)",
        },
        error: {
          50: "rgb(20, 0, 16)",
          100: "rgb(40, 0, 32)",
          200: "rgb(70, 0, 56)",
          300: "rgb(100, 0, 80)",
          400: "rgb(140, 0, 112)",
          500: "rgb(180, 0, 144)",
          600: "rgb(220, 0, 176)",
          700: "rgb(255, 0, 200)",
          800: "rgb(255, 100, 220)",
          900: "rgb(255, 180, 235)",
        },
        warning: {
          50: "rgb(20, 10, 0)",
          100: "rgb(40, 20, 0)",
          200: "rgb(60, 30, 0)",
          300: "rgb(90, 45, 0)",
          400: "rgb(130, 65, 0)",
          500: "rgb(170, 85, 0)",
          600: "rgb(210, 105, 0)",
          700: "rgb(255, 140, 0)",
          800: "rgb(255, 180, 80)",
          900: "rgb(255, 220, 160)",
        },
        success: {
          50: "rgb(0, 15, 20)",
          100: "rgb(0, 30, 40)",
          200: "rgb(0, 60, 80)",
          300: "rgb(0, 100, 120)",
          400: "rgb(0, 140, 160)",
          500: "rgb(0, 180, 200)",
          600: "rgb(0, 210, 230)",
          700: "rgb(0, 240, 255)",
          800: "rgb(80, 245, 255)",
          900: "rgb(160, 250, 255)",
        },
        "brand-primary": "rgb(120, 60, 240)",
        "default-font": "rgb(245, 245, 245)",
        "subtext-color": "rgb(110, 110, 110)",
        "neutral-border": "rgb(25, 25, 25)",
        black: "rgb(0, 0, 0)",
        "default-background": "rgb(0, 0, 0)",
      },
      fontSize: {
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "caption-bold": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "700",
            letterSpacing: "0em",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "body-bold": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "700",
            letterSpacing: "0em",
          },
        ],
        "heading-3": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "700",
            letterSpacing: "0em",
          },
        ],
        "heading-2": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "700",
            letterSpacing: "0em",
          },
        ],
        "heading-1": [
          "30px",
          {
            lineHeight: "36px",
            fontWeight: "700",
            letterSpacing: "0em",
          },
        ],
        "monospace-body": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
      },
      fontFamily: {
        caption: '"Kode Mono"',
        "caption-bold": '"Kode Mono"',
        body: '"IBM Plex Mono"',
        "body-bold": '"IBM Plex Mono"',
        "heading-3": "Rajdhani",
        "heading-2": "Rajdhani",
        "heading-1": "Rajdhani",
        "monospace-body": '"IBM Plex Mono"',
      },
      boxShadow: {
        sm: "0px 0px 6px 2px rgba(255, 0, 200, 0.5), 0px 0px 3px 1px rgba(163, 67, 255, 0.4)",
        default:
          "0px 0px 6px 2px rgba(255, 0, 200, 0.5), 0px 0px 3px 1px rgba(163, 67, 255, 0.4)",
        md: "0px 0px 10px 4px rgba(255, 0, 200, 0.6), 0px 0px 8px 2px rgba(163, 67, 255, 0.5), 0px 0px 4px 1px rgba(0, 240, 255, 0.4)",
        lg: "0px 0px 12px 5px rgba(255, 0, 200, 0.65), 0px 0px 10px 3px rgba(163, 67, 255, 0.6), 0px 0px 8px 2px rgba(0, 168, 255, 0.5), 0px 0px 4px 1px rgba(0, 240, 255, 0.45)",
        overlay:
          "0px 0px 12px 5px rgba(255, 0, 200, 0.65), 0px 0px 10px 3px rgba(163, 67, 255, 0.6), 0px 0px 8px 2px rgba(0, 168, 255, 0.5), 0px 0px 4px 1px rgba(0, 240, 255, 0.45)",
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        DEFAULT: "4px",
        lg: "12px",
        full: "9999px",
      },
      container: {
        padding: {
          DEFAULT: "16px",
          sm: "calc((100vw + 16px - 640px) / 2)",
          md: "calc((100vw + 16px - 768px) / 2)",
          lg: "calc((100vw + 16px - 1024px) / 2)",
          xl: "calc((100vw + 16px - 1280px) / 2)",
          "2xl": "calc((100vw + 16px - 1536px) / 2)",
        },
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
        256: "64rem",
        320: "80rem",
      },
      screens: {
        mobile: {
          max: "767px",
        },
      },
    },
  },
};
