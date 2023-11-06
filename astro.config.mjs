import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";


// https://astro.build/config
export default defineConfig({
  site: 'https://briqmx.github.io',
  base: '/space-landing-begrand',
  // base: '/',
  integrations: [tailwind(), icon({
    iconDir: "./src/icons",
    include: {
      bxl: ["*"],
      tabler: ["*"],
    }
  })],
});