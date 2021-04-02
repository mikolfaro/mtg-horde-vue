<template>
  <Modal :isOpen="isOpen" class="list-modal" @close="onClose">
    <template v-slot:header>{{ title }}</template>
    <template v-slot:body>
      <div>
        <p v-if="!cards.length">No cards</p>
        <Card v-for="(card, index) in cards" v-bind:key="index" :card="card">
          <template v-slot:buttons>
            <div class="buttons"></div>
          </template>
        </Card>
      </div>
    </template>
    <template v-slot:footer><div></div></template>
  </Modal>
</template>
<script>
  import Card from './Card'
  import Modal from './Modal'

  export default {
    name: 'ListModal',
    components: { Card, Modal },
    props: {
      title: { type: String },
      isOpen: {
        type: Boolean,
        default: false
      },
      cards: { type: Array }
    },
    methods: {
      onClose() {
        this.$emit("close")
      }
    }
  }
</script>
