/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F7F6",
        sidebar: "#E5E7EB",
      },
      borderRadius: {
        '4xl': '2rem', 
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      colors: {
       background: "#F4F7F6", 
      }
    },
  },
  plugins: [],
};

export default config;