import { action } from '@storybook/addon-actions'

import TokenCreator from '@/components/TokenCreator'

export default {
  title: 'TokenCreator'
}

export const simple = () => ({
  components: { TokenCreator },
  template: '<TokenCreator />',
})
