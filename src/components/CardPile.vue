<template>
  <div class="card-pile" :style="cardPileStyle">
    <span class="card-pile-label">{{ label }}</span>
    <form id="remove-card-form" @submit="handleRemoveCard">
      <label class="sr-only" for="cards-number">Numero di carte</label>
      <input id="cards-number"
             type="number"
             v-model="value"
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
      let cardPileStyle = {}
      if (this.background) {
        cardPileStyle['backgroundImage'] = `url(${this.background})`
      }

      return {
        removeCardText: "Rimuovi carta",
        value: '',
        cardPileStyle: cardPileStyle
      }
    },
    props: {
      label: { type: String },
      cards: { type: Array },
      background: { type: String }
    },
    methods: {
      handleRemoveCard() {
        console.log("Remove card")
      },
      handleChange() {
        console.log("Change")
      }
    }
  }
</script>

<style lang="sass">
  @import "~@/styles/_card-pile"
</style>
