<template>
  <div class="card" :class="{ tapped: tapped, token: card.isToken() }">
    <div v-if="attackedPlayer != null" class="target-player">{{ attackedPlayer + 1 }}</div>
    <div class="card-bounds">
      <img :src=image :alt="name" @click=onCardClick />
      <span v-if="card.isCreature()" class="pt-indicator">{{power}}/{{toughness}}</span>
    </div>
    <slot name="buttons">
      <button
          v-if="canTap && !card.tapped"
          class="tap-card"
          @click="onTap">
        <img :alt="$t('actions.tap')" :src="tapIcon" role="presentation" />
      </button>
      <button v-if="card.tapped" class="untap-card" @click="onUntap">
        <img :alt="$t('actions.untap')" :src="untapIcon" role="presentation" />
      </button>
      <button v-if="canDestroy" class="destroy-card" @click="onDestroy">
        <img :alt="$t('actions.destroy')" :src="destroyIcon" role="presentation" />
      </button>
    </slot>
  </div>
</template>
<script>
  import faceDownImage from '@/assets/back-card.png'
  import destroyIcon from '@/assets/destroy-icon.png'
  import tapIcon from '@/assets/tap-icon.png'
  import untapIcon from '@/assets/untap-icon.png'
  import Card from '@/models/Card'

  export default {
    name: 'Card',
    data() {
      return {
        destroyIcon: destroyIcon,
        tapIcon: tapIcon,
        untapIcon: untapIcon,
      }
    },
    props: {
      card: { type: Card },
      canTap: { type: Boolean, default: false },
      canDestroy: { type: Boolean, default: false },
    },
    computed: {
      name() {
        return this.faceDown ? this.$t("card.faceDownName") : this.card.name()
      },
      image() {
        if (this.faceDown) {
          return faceDownImage
        } else {
          return this.card.imageUrl(this.$i18n.locale)
        }
      },
      tapped() {
        return this.card.tapped
      },
      faceDown() {
        return this.card.faceDown
      },
      power() {
        return this.card.power()
      },
      toughness() {
        return this.card.toughness()
      },
      attackedPlayer() {
        return this.card.attackedPlayer
      }
    },
    methods: {
      onCardClick() {
        return "Card click"
      },
      onTap() {
        this.$emit("tap", this.card)
      },
      onUntap() {
        this.$emit("untap", this.card)
      },
      onDestroy() {
        this.$emit("destroy", this.card)
      }
    }
  }
</script>
<style lang="sass">
.card
  position: relative
  display: inline-block
  transition: 200ms all ease-in-out

  .target-player
    font-size: 1.5em
    background-color: rgba(0, 0, 0, 0.5)
    color: red
    width: 2em
    text-align: center

    position: absolute
    z-index: 2
    top: 30%
    left: 50%
    transform: translateX(-50%)

  .card-bounds
    width: 126px
    height: 176px
    background-repeat: no-repeat
    background-size: 100% 100%

  .pt-indicator
    position: absolute
    bottom: 0
    right: 4%
    padding: 2% 4%
    font-size: .8em
    color: white
    background-color: rgba(0, 0, 0, 0.5)
    border-radius: 5px
    text-align: center

  img
    width: 100%
    height: 100%
    clip-path: inset(0px 0px 0px 0px round 10px 10px)

  button
    width: 15%
    height: auto
    border-radius: 50%
    padding: 1.5%
    position: absolute
    bottom: 3%
    background: $color-light-grey
    border: 1px solid $color-black

    &.tap-card, &.untap-card
      left: 5%
    &.destroy-card
      left: 25%
    &.untap-card
      padding: 0
    img
      display: block

  &.tapped
    transform-origin: center
    transform: translate(25px, 25px) rotate(90deg)

    .target-player
      transform: translate(-50%, -50%) rotate(-90deg)
</style>
