export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#dbeeff',
          200: '#b6ddff',
          300: '#82c2ff',
          400: '#4ca2fb',
          500: '#2778e3',
          600: '#1f5fc2',
          700: '#1b4f9b',
          800: '#1c426f',
          900: '#1f3b57'
        }
      },
      boxShadow: {
        glass: '0 10px 35px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
}
