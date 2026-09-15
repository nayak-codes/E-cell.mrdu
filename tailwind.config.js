/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mru: {
          navy: '#0b1120',
          card: '#111827',
          cardHover: '#1f2937',
          blue: '#2563eb',
          lightBlue: '#60a5fa',
          emerald: '#10b981',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
