/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        panalab: {
          navy: "#002B66",
          sky: "#00A3E0",
          lightBg: "#F8FAFC"
        }
      }
    },
  },
  plugins: [],
}