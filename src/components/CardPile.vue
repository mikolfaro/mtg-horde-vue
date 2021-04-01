<template>
  <div class="card-pile">
    <div :style="cardPileStyle">
      <div class="content">
        <h2 class="mt-2 button-small">{{ label }}</h2>
        <p class="card-pile-count">{{cards.length}}</p>
      </div>

      <form class="inline-form" id="remove-card-form" @submit="handleRemoveCard">
        <div class="form-group">
          <label class="sr-only" for="cards-number">Numero di carte</label>
          <input id="cards-number"
                 type="number"
                 v-model="cardsNumber"
                 class="remove-card-input"
                 min="1"
                 @change="handleChange" />
        </div>

        <input type="submit" :value="removeCardLabel" class="button-small remove-card-button" />
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CardPile',
    data() {
      return {
        cardsNumber: 1,
      }
    },
    props: {
      label: { type: String },
      cards: { type: Array },
      background: { type: String },
      removeCardLabel: { type: String, default: "Remove cards" },
    },
    methods: {
      handleRemoveCard(e) {
        e.preventDefault()
        this.$emit('removeCards', this.cardsNumber)
      },
      handleChange() {
        console.log("Change")
      }
    },
    computed: {
      cardPileStyle() {
        return { backgroundImage: `url('${this.background}')` }
      }
    }
  }
</script>

<style lang="sass">
  @import '~@/styles/global/mixins'

  .card-pile
    width: 100%
    padding-top: 140%
    position: relative

    > div
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: rgba($color-black, 0.5)
      border: 1px dashed $color-white
      border-radius: 5px
      background-size: contain
      text-align: center
      display: flex
      flex-direction: column

      .content
        flex: 1 0 auto
      form
        flex-shrink: 0

      .button-small
        display: inline-block

    .card-pile-count
      margin-top: 3em
      color: $color-white
      @include TypoStyle(22px, 1.1, $Bold)

    form
      > div,
      > .button-small
        width: 50%
</style>
