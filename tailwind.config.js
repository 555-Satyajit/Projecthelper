/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3B82F6',
        'primary-purple': '#8B5CF6',
        'primary-green': '#10B981',
        'neutral-dark': '#1E293B',
        'neutral-light': '#F8FAFC',
        'neutral-medium': '#64748B',
        'accent-warning': '#F59E0B',
        'accent-error': '#EF4444',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
