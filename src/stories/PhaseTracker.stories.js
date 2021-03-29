import { action } from '@storybook/addon-actions'

import PhaseTracker from '../components/PhaseTracker.vue'

export default {
  title: 'PhaseTracker',
}

const Template = (args, { argTypes }) => ({
  components: { PhaseTracker },
  template: '<PhaseTracker v-bind="$props" />',
  props: Object.keys(argTypes),
  argTypes: {
    phase: {
      control: 'object',
      table: {
        disable: true
      }
    }
  }
})

export const survivorsTurn = Template.bind({})
survivorsTurn.args = {
  phase: {
    id: 'SURVIVORS_TURN',
    title: 'Survivors\' turn',
    description: 'Survivors (players) take their turn as a group. Any changes to the state of the Horde board, such as destroying or tapping Horde cards, should be made manually during this phase. When ready, click the next button to end your turn and move onto the Horde\'s turn'
  }
}

export const hordePlay = Template.bind({})
hordePlay.args = {
  phase: {
    id: 'HORDE_PLAY',
    title: 'Horde Play',
    description: 'The cards revealed from the Horde\'s library have been resolved. Any cards the Horde can play from it\'s hand or graveyard are currently in the pending zone. Respond to those cards now, then manually resolve any effects, then press next to continue to the Horde attack phase.'
  },
}
