/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "text-color":"#fff",
        "bg-color": "#000", 
        "bg-color1": "#B7552D", 
      }
    },
  },
  plugins: [],
}

