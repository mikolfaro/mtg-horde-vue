<template>
  <Modal :is-open="open" class="spell-modal" @close="resolveSpell">
    <template v-slot:header>The Horde cast</template>
    <template v-slot:body>
      <div class="spell">
        <img v-if="spell" :src="spell.imageUrl()" :alt="spell.name()" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="buttons">
        <button class="button-small" @click="resolveSpell">Resolve</button>
        <button class="button-small" @click="counterSpell">Counter spell</button>
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
      spell: { type: Card }
    },
    data() {
      return {}
    },
    computed: {
      open() {
        return !!this.spell
      }
    },
    methods: {
      resolveSpell() {
        this.$emit('resolve-spell', this.spell)
      },
      counterSpell() {
        this.$emit('counter-spell', this.spell)
      }
    }
  }
</script>
<style lang="sass">
  .spell-modal .buttons
    display: flex
    flex-direction: row
    justify-content: space-between
</style>
