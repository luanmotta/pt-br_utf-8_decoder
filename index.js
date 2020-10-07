const dictionary = require('./dictionary.json')
const invalidChar = '�'

const temAcento = (str) => {
  return !!str.includes(invalidChar)
}

const removeAcento = (str) => {
  return str.replace(invalidChar, '')
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const uncapitalizeFirstLetter = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const findOnDictionary = (str) => {
  const fullword = str
  const regex = new RegExp(`[a-zA-Z${invalidChar}]+`, 'g')
  let subword = fullword.match(regex)
  if (!subword) return null
  subword = subword[0]

  if (dictionary[subword]) {
    return fullword.replace(regex, dictionary[subword])
  }
  subword = uncapitalizeFirstLetter(subword)
  if (dictionary[subword]) {
    return fullword.replace(regex, capitalizeFirstLetter(dictionary[subword]))
  }
  subword = subword.toLowerCase()
  if (dictionary[subword]) {
    return fullword.replace(regex, (dictionary[subword]).toUpperCase())
  }
  return null
}

module.exports = (str) => {
  let words = str.split(' ')

  words = words.map(word => {
    if (word === invalidChar) return 'é'
    if (!temAcento(word)) {
      return word
    }
    const formatted = findOnDictionary(word)
    return formatted || removeAcento(word)
  })
  return words.join(' ')
}
