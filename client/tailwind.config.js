/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fantasy-gold': '#d4af37',
        'fantasy-purple': '#6b46c1',
        'fantasy-blue': '#3b82f6',
        'fantasy-green': '#22c55e',
        'fantasy-dark': '#1e1b4b',
        'fantasy-light': '#f8fafc',
      },
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
