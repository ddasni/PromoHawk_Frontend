// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    'nuxt-charts',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  icon: {
    customCollections: [{
      prefix: 'icon-local',
      dir: './assets/icons'
    }]
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      apiImage: process.env.NUXT_API_IMAGE
    }
  }
})
