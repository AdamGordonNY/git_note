import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontWeight: {
        bold: "700",
        regular: "400",
        medium: "500",
      },
      colors: {
        "gradient-start": "#43B7FE",
        "gradient-end": "##4F48E6",
        primary: {
          "500": "#42BBFF",
          "800": "#0C3247",
          "900": "rgba(66, 187, 255, 0.1)",
        },
        black: {
          "600": "#2E3757",
          "700": "#1D2032",
          "800": "#131625",
          "900": "#10121E",
        },
        white: {
          "100": "#FFFFFF",
          "300": "#ADB3CC",
          "500": "#55597D",
        },
        purple: {
          "500": "#9542FF",
          "900": "rgba(149, 66, 255, 0.1)",
        },
        green: {
          "400": "#68D1BF",
          "500": "#42FF77",
          "900": "rgba(66, 255, 119, 0.1)",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        foreground: "hsl(var(--foreground))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        default: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      screens: {
        xs: "430px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
