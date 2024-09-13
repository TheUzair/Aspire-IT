/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '62': '15.5rem',
        '66': '16.5rem',
      },
      screens: {
        'custom-1075': '1075px',
      },
      maxWidth: {
        '25rem': '25rem', // Define max-width of 25rem
        '28rem': '28rem', // Existing max-width of 28rem
      },
    }
  },
  plugins: [],
}

