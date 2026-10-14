// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// SITE_URL: final address of the site (custom domain or https://<user>.github.io).
// BASE_PATH: "/" for a custom domain or a user site, "/<repo>/" for a GitHub project site.
const site = process.env.SITE_URL || 'https://thomaspeyrat.github.io';
const base = process.env.BASE_PATH || '/thomas.peyrat.io/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
  // LaTeX in Markdown: $…$ inline, $$…$$ display; rendered to HTML + MathML at build time.
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml', strict: 'warn' }]],
    }),
  },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
