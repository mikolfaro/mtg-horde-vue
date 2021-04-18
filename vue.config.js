module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/global/vars"`
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/mtg-horde-vue/'
    : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
