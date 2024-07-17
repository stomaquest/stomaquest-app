// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/kinde',
  ],
  elementPlus: {
    // themes: [
    //   "dark",
    // ]
  },
  piniaPersistedstate: {
    storage: 'localStorage',
  },

  devtools: { enabled: true },
});
