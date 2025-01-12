/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // This is needed for Vite's root template
    "./src/**/*.{js,ts,jsx,tsx}", // Includes React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
