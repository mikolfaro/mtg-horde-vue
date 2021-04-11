<template>
  <Modal :isOpen="isOpen" class="list-modal" @close="onClose">
    <template v-slot:header>{{ title }}</template>
    <template v-slot:body>
      <div>
        <p v-if="!cards.length">No cards</p>

        <Swiper ref="swiper"
                :options="swiperOptions"
                @slide-change="onChange">
          <SwiperSlide v-for="(card, i) in cards" v-bind:key="i">
            <Card :card="card" :can-tap="false" :can-destroy="false" />
          </SwiperSlide>
        </Swiper>
      </div>
    </template>
    <template v-slot:footer>
      <div class="button-group" v-if="cards.length">
        <button
            class="button-small"
            v-for="(label, value) in actions"
            v-bind:key="value"
            @click="onAction(value)"
        >{{ label }}</button>
      </div>
    </template>
  </Modal>
</template>
<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  import Card from './Card'
  import Modal from './Modal'

  export default {
    name: 'ListModal',
    components: { Card, Modal, Swiper, SwiperSlide },
    directives: { swiper: directive },
    props: {
      title: { type: String },
      isOpen: {
        type: Boolean,
        default: false
      },
      cards: { type: Array },
      actions: { type: Object }
    },
    data() {
      return {
        activeCard: null,
        swiperOptions: {
          slidesPerView: 5,
          centeredSlides: true,
          loop: false,
          slidesPerGroup: 1,
          paginationClickable: true,
          spaceBetween: 30
        }
      }
    },
    mounted() {
      this.activeCard = this.cards[0]
    },
    computed: {
      swiper() {
        return this.$refs.swiper.$swiper
      },
    },
    methods: {
      onChange() {
        this.activeCard = this.cards[this.swiper.activeIndex]
        this.$emit('card-change', this.activeCard)
      },
      onClose() {
        this.$emit("close")
      },
      onAction(action) {
        this.$emit('action', action, this.activeCard)
      }
    }
  }
</script>
<style lang="sass" scoped>
  ::v-deep
    .card-bounds
      width: 126px * 1.3
      height: 176px * 1.3

  .swiper-slide .card
    transform: scale(0.7)
    transition: .3s
    transition-delay: .2s

  .swiper-slide-prev,
  .swiper-slide-next
    .card
      transform: scale(0.8)
      transition: .3s
      transition-delay: .2s
      transition-timing-function: ease

  .swiper-slide-active .card
    transform: scale(1.0)
    transition: .5s
    transition-timing-function: ease

  .button-group
    margin: auto
    width: 40%
</style>
