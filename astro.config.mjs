// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',

  integrations: [
    starlight({
      title: 'Component Playground',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Components',
          items: [
            { label: 'Button', slug: 'button' },
            { label: 'Interactive Button', slug: 'interactive-button' },
            { label: 'React Counter', slug: 'react-counter' },
            { label: 'Jacdac', slug: 'jacdac' },
          ],
        },
        {
          label: 'Guides',
          items: [{ label: 'Example Guide', slug: 'guides/example' }],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),

  devToolbar: {
    enabled: false,
  },
});
