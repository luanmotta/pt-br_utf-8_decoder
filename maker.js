const { readFileSync, writeFileSync } = require('fs')

const file = readFileSync('./pt-br_words.txt', { encoding: 'utf-8' })

const array = file.split('\n')

const obj = {}

const regex = /á|ã|à|é|í|ó|õ|ú|ç/g

const temAcento = (str) => {
  return !!str.match(regex)
}

const removeUTF = (str) => {
  return str.replace(regex, '?')
}

array.forEach(item => {
  if (temAcento(item))
  obj[removeUTF(item)] = item
})

writeFileSync('./utf-8.json', JSON.stringify(obj), { encoding: 'utf-8' })
