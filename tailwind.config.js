/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F2EA',
        paper: {
          DEFAULT: '#FAF8F5',
          white: '#FFFFFF',
          warm: '#F2EFE8',
        },
        ink: {
          DEFAULT: '#171615',
          light: '#2A2826',
          pure: '#0B0B0A',
        },
        burgundy: {
          DEFAULT: '#64131C',
          deep: '#500F17',
          light: '#841B26',
          glow: 'rgba(100, 19, 28, 0.15)',
        },
        maroon: {
          DEFAULT: '#64131C',
          dark: '#500F17',
          light: '#841B26',
          glow: 'rgba(100, 19, 28, 0.15)',
        },
        sand: {
          DEFAULT: '#F5F2EA',
          light: '#FAF8F5',
          dark: '#EAE6DD',
          muted: '#DBD5C9',
        },
        dark: {
          DEFAULT: '#171615',
          pure: '#0B0B0A',
          card: '#1F1E1C',
          elevated: '#282725',
          border: 'rgba(23, 22, 21, 0.08)',
        },
        muted: {
          DEFAULT: '#6E6A64',
          light: '#9E9990',
          dark: '#45423E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
      },
    },
  },
  plugins: [],
}
