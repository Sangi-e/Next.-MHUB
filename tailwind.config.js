
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  darkMode: 'class', // Enabled manual toggling
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'handshake': 'handshake 1.2s ease-in-out infinite',
      },
      keyframes: {
        handshake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-12deg) translateY(1px)' },
          '20%': { transform: 'rotate(12deg) translateY(-1px)' },
          '30%': { transform: 'rotate(-12deg) translateY(1px)' },
          '40%': { transform: 'rotate(12deg) translateY(-1px)' },
          '50%': { transform: 'rotate(0deg)' }, // Pause in middle
        }
      }
    },
  },
  plugins: [],
}
