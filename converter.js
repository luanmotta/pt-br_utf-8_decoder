const dictionary = require('./dictionary.json')

const temAcento = (str) => {
  return !!str.includes('?')
}

const removeAcento = (str) => {
  return str.replace('?', '')
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const uncapitalizeFirstLetter = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const findOnDictionary = (str) => {
  const fullword = str
  let subword = fullword.match(/[a-zA-Z?]+/g)
  if (!subword) return null
  subword = subword[0]

  if (dictionary[subword]) {
    return fullword.replace(/[a-zA-Z?]+/g, dictionary[subword])
  }
  subword = uncapitalizeFirstLetter(subword)
  if (dictionary[subword]) {
    return fullword.replace(/[a-zA-Z?]+/g, capitalizeFirstLetter(dictionary[subword]))
  }
  subword = subword.toLowerCase()
  if (dictionary[subword]) {
    return fullword.replace(/[a-zA-Z?]+/g, (dictionary[subword]).toUpperCase())
  }
  return null
}

module.exports = (str) => {
  let words = str.split(' ')

  words = words.map(word => {
    if (word === '?') return 'é'
    if (!temAcento(word)) {
      return word
    }
    const formatted = findOnDictionary(word)
    return formatted || removeAcento(word)
  })
  return words.join(' ')
}
