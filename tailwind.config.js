/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        header: ['Baskervville', 'serif'],
        body: ['Courier Prime', 'monospace'],
        bottle: ['anotherfool', 'sans-serif']
      }
    }
  },
  plugins: []
}
