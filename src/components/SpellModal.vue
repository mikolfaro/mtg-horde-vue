<template>
  <Modal :is-open="open" class="spell-modal" @close="resolveSpell">
    <template v-slot:header>The Horde cast</template>
    <template v-slot:body>
      <div class="card">
        <img :src="card.imageUrl()" :alt="card.name()" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="buttons">
        <button @click="resolve">Resolve</button>
        <button @click="counterSpell">Counter spell</button>
      </div>
    </template>
  </Modal>
</template>
<script>
  import Modal from '@/components/Modal'
  import Card from '@/models/Card'

  export default {
    name: 'SpellModal',
    components: { Modal },
    props: {
      card: { type: Card }
    },
    data() {
      return { isOpen: true }
    },
    computed: {
      open() {
        return this.isOpen && !!this.card
      }
    },
    methods: {
      resolveSpell() {
        this.isOpen = false
        this.resolve(this.card)
      },
      counterSpell() {
        this.isOpen = false
        this.counter(this.card)
      }
    }
  }
</script>
