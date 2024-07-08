/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./navigation/*.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/Tabs/Home/*.{js,jsx,ts,tsx}",
    "./screens/Tabs/RI/*.{js,jsx,ts,tsx}",
     "./screens/Tabs/RI/Inventory/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

