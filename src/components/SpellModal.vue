<template>
  <Modal :is-open="open" class="spell-modal" @close="resolveSpell">
    <template v-slot:header>{{ $t("spellModal.title" )}}</template>
    <template v-slot:body>
      <div class="spell">
        <img v-if="spell" :src="spell.imageUrl()" :alt="spell.name()" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="button-group">
        <button class="button-small" @click="resolveSpell">
          {{ $t("actions.resolve") }}
        </button>
        <button class="button-small" @click="counterSpell">
          {{ $t("actions.counterSpell" ) }}
        </button>
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
  .spell-modal
    .buttons
      display: flex
      flex-direction: row
      justify-content: space-between

    .spell img
      border-radius: 4.5%

  .button-group
    margin: auto
    width: 40%
</style>
