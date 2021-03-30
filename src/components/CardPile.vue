<template>
  <div class="card-pile" :style="cardPileStyle">
    <span class="card-pile-label">{{ label }}</span>
    <form id="remove-card-form" @submit="handleRemoveCard">
      <label class="sr-only" for="cards-number">Numero di carte</label>
      <input id="cards-number"
             type="number"
             v-model="cardsNumber"
             class="remove-card-input"
             min="1"
             @change="handleChange" />
      <input type="submit" :value="removeCardText" class="remove-card-btn" />
    </form>
    <span class="card-pile-count">{{cards.length}}</span>
  </div>
</template>
<script>
  export default {
    name: 'CardPile',
    data() {
      return {
        removeCardText: "Rimuovi carta",
        cardsNumber: 1,

      }
    },
    props: {
      label: { type: String },
      cards: { type: Array },
      background: { type: String }
    },
    methods: {
      handleRemoveCard() {
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
  @import "~@/styles/_card-pile"
</style>
