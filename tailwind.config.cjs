module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e6eeff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af'
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      transition: {
        'DEFAULT': 'all 300ms ease-in-out',
      }
    }
  },
  plugins: []
}
