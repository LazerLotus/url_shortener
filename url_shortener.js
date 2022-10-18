function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function url_shortener() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []

  collection = collection.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), numbers.split(''))

  let url = ''
  for (let i = 0; i < 5; i++) {
    url += sample(collection)
  }
  return url
}

module.exports = urlShortener