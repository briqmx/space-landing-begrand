import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

const isDevelopment = process.env.NODE_ENV !== 'production';


// https://astro.build/config
export default defineConfig({
  site: 'http://sumametros.mx',

  // base: '/space-landing-begrand',
  // base: '/',
  base: isDevelopment ? '/' : '/',

  integrations: [icon({
    iconDir: "./src/icons",
    include: {
      bxl: ["*"],
      tabler: ["*"],
    }
  }),react()],

  vite: {
    plugins: [tailwindcss()],
  },
});