import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from '@astrojs/react';

const isDevelopment = process.env.NODE_ENV !== 'production';


// https://astro.build/config
export default defineConfig({
  site: 'https://sumametros.briq.mx',
  // base: '/space-landing-begrand',
  // base: '/',
  base: isDevelopment ? '/' : '/',
  redirects: {
    '/v2': '/',
  },
  integrations: [tailwind(), icon({
    iconDir: "./src/icons",
    include: {
      bxl: ["*"],
      tabler: ["*"],
    }
  }),react()],
});