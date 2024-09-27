import type { Config } from 'tailwindcss';
import theme from './src/theme';

const config: Config = {
  content: [
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [theme.font.base],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand-title':
          'linear-gradient(270deg, #ED1C24 0.01%, #EF4029 19.15%, #FF671F 99.99%)',
      },
      borderColor: {
        'custom-grey': '#d9d9d9',
      },
      backgroundColor: {
        disabledState: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
