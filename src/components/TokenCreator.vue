<template>
  <div class='token-creator'>
    <img :src=tokenImage role='presentation'/>
    <span id='tokenStats'>{tokenPower}/{tokenToughness}</span>

    <button class="token-stat-button" @click="onDebuffPower">-</button>
    <button class="token-stat-button" @click="onBuffPower">+</button>/
    <button class="token-stat-button" @click="onDebuffToughness">-</button>
    <button class="token-stat-button" @click="onBuffToughness">+</button>
    <button class="token-spawn-button" onClick="onSpawn">Spawn</button>
  </div>
</template>
<script>
  import tokenImage from '@/assets/zombie-token.jpg'

  export default {
    name: 'TokenCreator',
    data() {
      return {
        tokenImage: tokenImage
      }
    },
    methods: {
      onDebuffPower() {

      },
      onBuffPower() {

      },
      onDebuffToughness() {

      },
      onBuffToughness() {

      },
      onSpawn() {

      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/token-creator.sass"
</style>
