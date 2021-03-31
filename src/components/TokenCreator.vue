<template>
  <div class='token-creator'>
    <img :src="tokenDefaultData.imageUrl" role='presentation'/>
    <span id='tokenStats'>{{tokenPower}}/{{tokenToughness}}</span>

    <button class="token-stat-button" @click="onDebuffPower">-</button>
    <button class="token-stat-button" @click="onBuffPower">+</button>/
    <button class="token-stat-button" @click="onDebuffToughness">-</button>
    <button class="token-stat-button" @click="onBuffToughness">+</button>
    <button class="token-spawn-button" @click="onSpawn">Spawn</button>
  </div>
</template>
<script>
  export default {
    name: 'TokenCreator',
    data() {
      return {
        tokenPower: 2,
        tokenToughness: 2,
      }
    },
    props: {
      tokenDefaultData: { type: Object }
    },
    methods: {
      onDebuffPower() {
        this.tokenPower -= 1
      },
      onBuffPower() {
        this.tokenPower += 1
      },
      onDebuffToughness() {
        this.tokenToughness -= 1
      },
      onBuffToughness() {
        this.tokenToughness += 1
      },
      onSpawn() {
        this.$emit("spawnToken", { power: this.tokenPower, toughness: this.tokenToughness })
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/token-creator.sass"
</style>
