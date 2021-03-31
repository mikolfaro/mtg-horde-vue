<template>
  <Modal v-if="spell" class="spell-modal" @close="resolveSpell">
    <template v-slot:header>The Horde cast</template>
    <template v-slot:body>
      <div class="spell">
        <img v-if="spell" :src="spell.imageUrl()" :alt="spell.name()" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="buttons">
        <button @click="resolveSpell">Resolve</button>
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
        this.$emit('resolveSpell', this.spell)
      },
      counterSpell() {
        this.$emit('counterSpell', this.spell)
      }
    }
  }
</script>
