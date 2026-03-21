// https://nuxt.com/docs/api/configuration/nuxt-config

import license from 'rollup-plugin-license'
import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
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
      redirect: '/committee/2026%20Sem%201'
    },
    '/contact': {
      redirect: '/contact/club-membership'
    },
    '/publications': {
      redirect: '/publications/articles'
    }
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
        }
      ]
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
    quality: 80,
    format: ['avif', 'webp'],
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dugjyatvx/image/upload'
    } 
  }
})
