<template>
  <div class="home">
    <h1>Horde Magic</h1>

    <GameForm onSubmit="" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameForm from '@/components/GameForm.vue'

export default {
  name: 'Home',
  components: {
    GameForm
  }
}
</script>
