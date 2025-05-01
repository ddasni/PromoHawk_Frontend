// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  icon: {
    customCollections: [{
      prefix: 'icon-local',
      dir: './assets/icons'
    }]
  }
})
