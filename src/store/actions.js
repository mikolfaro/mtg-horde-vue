import Card from '@/models/Card'

export default {
  setDeck(context, newDeck) {
    context.commit('setDeck', newDeck)
  },
  setPlayersCount(context, graveyardTokens) {
    context.commit('setGraveyardTokens', graveyardTokens)
  },
  setGraveyardTokens(context, graveyardTokens) {
    context.commit('setGraveyardTokens', graveyardTokens)
  },
  stepPhase(context) {
    context.commit('stepPhase')

    if (context.state.phase.id === 'HORDE_DRAW') {
      context.commit('draw')
      context.commit('untapAll')
    } else if (context.state.phase.id === 'HORDE_PLAY') {
      context.commit('play')
    } else if (context.state.phase.id === 'HORDE_ATTACK') {
      context.commit('attack')
    }
  },
  resolveSpell(context, spell) {
    context.commit('resolveSpell', spell)
  },
  counterSpell(context, spell) {
    context.commit('counterSpell', spell)
  },
  millDeck(context, count) {
    context.commit('millDeck', count)
  },
  tapPermanent(context, permanent) {
    context.commit('tapPermanent', permanent)
  },
  untapPermanent(context, permanent) {
    context.commit('untapPermanent', permanent)
  },
  destroyPermanent(context, permanent) {
    context.commit('destroyPermanent', permanent)
  },
  setSpawnTokens(context, spawnableTokens) {
    context.commit('setSpawnTokens', spawnableTokens)
  },
  spawnToken({commit, state}, power, toughness) {
    let tokenData = state.spawnableTokens.find((tokenData) => {
      return power == tokenData.power && toughness == tokenData.toughness
    })

    tokenData = Object.assign({}, state.spawnableTokens[0], {"power": power, "toughness": toughness})
    commit('cast', Card.freshFromData(tokenData, 6001))
  },
  cast({commit, state}, spell) {
    commit('addToBoard', spell)
    if (spell.isToken()) {
      state.board.push(spell)
    } else {
      state.stack.push(spell)
    }
  },
}
