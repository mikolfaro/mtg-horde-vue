import { action } from '@storybook/addon-actions'

import GameForm from '../components/GameForm.vue'

export default {
  title: 'GameForm',
}

export const withText = () => ({
  components: { GameForm },
  template: '<GameForm @onSubmit="action" />',
  methods: { action: action('clicked') }
})
