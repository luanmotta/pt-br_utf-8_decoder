const { readFileSync, writeFileSync } = require('fs')
const path = require('path')
const invalidChar = '�'

const file = readFileSync(path.join(__dirname, './pt-br_words.txt'), { encoding: 'utf-8' })

const array = file.split(/\n|\r/)

const obj = {}

const regex = /á|ã|à|é|í|ó|õ|ú|ç/g

const temAcento = (str) => {
  return !!str.match(regex)
}

const removeUTF = (str) => {
  return str.replace(regex, invalidChar)
}

array.forEach(item => {
  if (temAcento(item))
  obj[removeUTF(item)] = item
})

writeFileSync(path.join(__dirname, './dictionary.json'), JSON.stringify(obj), { encoding: 'utf-8' })
