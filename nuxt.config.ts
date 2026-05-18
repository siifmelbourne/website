// https://nuxt.com/docs/api/configuration/nuxt-config

import license from 'rollup-plugin-license'
import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: [
        '/committee/2026-sem-1',
        '/committee/2025-sem-2',
        '/committee/2025-sem-1',
        '/publications/macro-markets',
      ],
    },
  },
  
  hooks: {
    'nitro:build:public-assets': (nitro) => {
      const nuxtDir = path.join(nitro.options.output.publicDir, '_nuxt')
      const banner = `// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0-only
      //
      // @source: https://github.com/siifmelbourne/website
      // 
      // Copyright (C) 2026 flatplum
      // 
      // Please see the source repo for unminified code.
      `
    const footer = '// @license-end'

    if (!fs.existsSync(nuxtDir)) return

      const files = fs.readdirSync(nuxtDir)
      for (const file of files) {
        if (file.endsWith('.js')) {
          const filePath = path.join(nuxtDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')
          fs.writeFileSync(filePath, banner + content + footer, 'utf-8')
        }
      }
    },
  },

  app: {
    head: {
      title: 'Social Impact Investment Fund', // default fallback title
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-48x48.png', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/favicon-192x192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/favicon-180x180.png' },
      ],
    }
  },

  vite: {
    plugins: [
      license({
        thirdParty: {
          output: "",
          allow: {
            // If we allow AGPL, then we must provide source code
            test: 'MIT',
            failOnUnlicensed: true,
            failOnViolation: true,
          },
        },
      })
    ],
    esbuild: {
      legalComments: 'none',
    }
  },

  routeRules: {
    '/committee': {
      redirect: '/committee/2026-sem-1'
    },
    '/contact': {
      redirect: '/contact/club-membership'
    },
    '/publications': {
      redirect: '/publications/articles'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  telemetry: false,

  css: [
    '~/assets/css/normalize.css',
    '~/assets/css/reusable.css',
    '~/assets/css/global.css'
  ],

  modules: ['@nuxt/image'],

  image: {
    quality: 60,
    format: ['avif', 'webp'],
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dugjyatvx/image/upload'
    } 
  }
})
