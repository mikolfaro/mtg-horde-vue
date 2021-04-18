#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios')

const DECKS_DIR = './src/decks'

const extractData = function (card) {
  let tmp = card.data.type_line.split(" — ")
  const types = tmp.shift().trim().split(" ")
  const subtypes = tmp.length ? tmp.shift().trim().split(" ") : null

  return {
    id: card.data.id,
    manaCost: card.data.mana_cost,
    name: card.data.name,
    type: card.data.type_line,
    types: types,
    subtypes: subtypes,
    imageUrl: card.data["image_uris"].normal,
    power: card.data.power,
    toughness:card.data.toughness,
    colors: card.data.colors,
    set: card.data.set,
    collectorNumber: card.data.collector_number
  }
}

const downloadCardData = function (card) {
  if (card.id) {
    return axios.get(`https://api.scryfall.com/cards/${card.id}`)
      .then(extractData)
      .catch(function (error) {
        if (error) {
          console.error("Card download failed", card, error)
        }
        return card
      })
  } else {
    return axios.get("https://api.scryfall.com/cards/named", {
      params: { exact: card.name }
    })
    .then(extractData)
    .catch(function (error) {
      if (error) {
        console.error("Card download failed", card, error)
      }
      return card
    })
  }
}

const downloadTranslationsData = function (card) {
  if (card.set && card.collectorNumber && !card.type.startsWith('Token')) {
    const url = `https://api.scryfall.com/cards/${card.set}/${card.collectorNumber}/it`
    return axios.get(url)
      .then(function (translationData) {
        return Object.assign({}, card, {
          translations: {
            it: {
              name: translationData.printed_name,
              imageUrl: card.data?.image_uris?.normal
            }
          }
        })
      })
      .catch(function (error) {
        console.log("Card translation download failed", url)
        return card
      })
  } else {
    return card
  }
}

fs.readdir(DECKS_DIR, (err, files) => {
  files.forEach(file => {
    if (file.endsWith('.json')) {
      console.log(`Importing ${file}`)

      const deck = JSON.parse(fs.readFileSync(DECKS_DIR + '/' + file))
      Promise.all(
        deck.deckList
          .map(downloadCardData)
          .map(cardDataPromise => cardDataPromise.then(downloadTranslationsData))
      ).then(function (data) {
        deck.deckList = data
        fs.writeFile(DECKS_DIR + '/' + file, JSON.stringify(deck), (err) => {
          if (err) {
            console.error("File write failed", err)
          }
        })
      })
    }
  });
})
