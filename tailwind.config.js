/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0F',
        'bg-secondary': '#141420',
        'bg-card': 'rgba(255,255,255,0.05)',
        'text-primary': '#F5F0EB',
        'text-secondary': '#8A8294',
        'accent-pink': '#FF6F91',
        'accent-gold': '#F2B705',
        'accent-rose': '#E0435A',
      }
    },
  },
  plugins: [],
}
