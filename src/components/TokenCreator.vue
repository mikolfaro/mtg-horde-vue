<template>
  <div class='token-creator'>
    <div class="token">

    </div>
    <div class="token-image" :style="styleObject">
      <span id='tokenStats'>{{tokenPower}}/{{tokenToughness}}</span>

      <div>
        <button class="token-stat-button" @click="onDebuffPower">-</button>
        <button class="token-stat-button" @click="onBuffPower">+</button>/
        <button class="token-stat-button" @click="onDebuffToughness">-</button>
        <button class="token-stat-button" @click="onBuffToughness">+</button>
      </div>

      <button class="button-small token-spawn-button" @click="onSpawn">
        {{ $t('tokenCreator.spawnButton' )}}
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TokenCreator',
    data() {
      return {
        tokenPower: 2,
        tokenToughness: 2,
        style: {},
      }
    },
    props: {
      tokenDefaultData: { type: Object }
    },
    computed: {
      styleObject() {
        if (this.tokenDefaultData && this.tokenDefaultData.imageUrl) {
          return { "background-image": `url(${this.tokenDefaultData.imageUrl})` }
        } else {
          return null
        }
      }
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
        this.$emit("spawn-token", { power: this.tokenPower, toughness: this.tokenToughness })
      }
    }
  }
</script>
<style lang="sass">
  .token-creator
    position: relative
    color: white
    width: 100%
    padding-top: 140%

    .token-image
      display: flex
      flex-direction: column
      align-items: center
      justify-content: flex-end

      background-color: rgba($color-black, 0.5)
      background-size: contain
      background-repeat: no-repeat
      border: 1px dashed $color-white
      border-radius: 2px

      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0

    #token-stats
      display: block

    img
      background-repeat: no-repeat
      background-size: 100% 100%
      width: 64px
      height: 89px
      display: block

    .token-stat-button
      position: relative
      width: 15px
      bottom: 0
      padding: 0

    .token-spawn-button
      width: 100%
</style>
