import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [require('tailwindcss'), require('autoprefixer')],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
});
