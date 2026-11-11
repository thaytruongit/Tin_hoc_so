import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070b14',
          card: '#0d1527',
          cardBorder: '#1e293b',
          surface: '#131e36',
          cyan: '#00f0ff',
          neon: '#38bdf8',
          purple: '#a855f7',
          pink: '#ec4899',
          mana: '#10b981',
          gold: '#f59e0b',
          crimson: '#ef4444',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.45)',
        'neon-purple': '0 0 20px -3px rgba(168, 85, 247, 0.45)',
        'neon-gold': '0 0 20px -3px rgba(245, 158, 11, 0.45)',
        'neon-mana': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'neon-crimson': '0 0 20px -3px rgba(239, 68, 68, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px -2px rgba(0, 240, 255, 0.4)' },
          'to': { boxShadow: '0 0 25px 2px rgba(0, 240, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
