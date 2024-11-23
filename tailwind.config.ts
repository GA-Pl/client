import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard'],
      maple: ['MaplestoryOTF'],
    },
    extend: {
      colors: {
        primary: '#ED4264',
        primary100: '#fde8e8',
        primary200: '#fbd1d1',
        primary300: '#f9baba',
        primary400: '#f7a4a4',
        primary500: '#f58d8d',
        primary600: '#f37676',
        primary700: '#f15f5f',
        primary800: '#ef4848',
        gray900: '#171923',
        gray800: '#1A202C',
        gray700: '#2D3748',
        gray600: '#4A5568',
        gray500: '#718096',
        gray400: '#A0AEC0',
        gray300: '#CBD5E0',
        gray200: '#E2E8F0',
      },
      screens: {
        tablet: '400px',
        laptop: '640px',
        desktop: '1024px',
      },
      scale: {
        '110': '1.10',
        '95': '0.95',
      },
      transitionProperty: {
        size: 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      transform: ['responsive', 'hover', 'focus'],
    },
  },

  plugins: [],
};

export default config;
