/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#4A2E1A',      // Deep Brown
          saffron: '#F58220',    // Saffron Orange
          yellow: '#F6C343',     // Golden Yellow
          blue: '#1E88E5',       // River Blue
          cream: '#F8F6EF',      // Cream Background
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(74, 46, 26, 0.08)',
      },
    },
  },
  plugins: [],
};
