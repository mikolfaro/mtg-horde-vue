<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">{{ $t("nav.home") }}</router-link> |
      <router-link to="/about">{{ $t("nav.about") }}</router-link> |

      <button @click="onItClick">IT</button> |
      <button @click="onEnClick">EN</button>
    </nav>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {}
    },
    methods: {
      onItClick() {
        console.log("Change lang")
        this.$i18n.locale = "it"
      },
      onEnClick() {
        this.$i18n.locale = "en"
      }
    }
  }
</script>
<style lang="sass">
  @import './app.sass'

  nav
    text-align: center
</style>
