import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'all-sides': '0 4px 8px rgba(0, 0, 0, 0.05), 0 -4px 8px rgba(0, 0, 0, 0.05), 4px 0 8px rgba(0, 0, 0, 0.05), -4px 0 8px rgba(0, 0, 0, 0.05)',
        'all-sides-hover': '0 8px 16px rgba(0, 0, 0, 0.09), 0 -8px 16px rgba(0, 0, 0, 0.09), 8px 0 16px rgba(0, 0, 0, 0.09), -8px 0 16px rgba(0, 0, 0, 0.09)',
        // 'all-sides-dark': '0 8px 16px rgba(255, 255, 255, 0.1), 0 -8px 16px rgba(255, 255, 255, 0.1), 8px 0 16px rgba(255, 255, 255, 0.1), -8px 0 16px rgba(255, 255, 255, 0.1)',
        // 'all-sides-dark-hover': '0 8px 16px rgba(255, 255, 255, 0.2), 0 -8px 16px rgba(255, 255, 255, 0.2), 8px 0 16px rgba(255, 255, 255, 0.2), -8px 0 16px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
