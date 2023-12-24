const fs = require('fs')

const onlyTextRegExp = new RegExp('^[a-zа-яё\d}]+$', 'i')
let dictionary = {}

const splitString = (string) =>
  string
    .split(/[ ,\r\n]/i)
    .filter((str) => !!str && onlyTextRegExp.test(str))

const getOutputValue = () => {
  const output = []
  Object
    .keys(dictionary)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      output.push(dictionary[key])
    })
  dictionary = {}
  return JSON.stringify(output)
}

const runStream = async (inputFileName, outputFileName) => {
  return new Promise((res, rej) => {
    const $ = fs.createReadStream(inputFileName)

    $.on('data', (chunk) => {
      const arr = splitString(String(chunk))
      arr.forEach((str) => {
        if (!dictionary[str]) {
          dictionary[str] = 1
          return
        }
        dictionary[str]++
      })
    })

    $.on('close',  () => {
      const output = getOutputValue()
      const writer = fs.createWriteStream(outputFileName)
      writer.write(output)
      res(output)
    })

    $.on('error', rej)
  })
}

module.exports = {
  runStream,
}

// Исполняется если не автотест
if (process.env.JEST_WORKER_ID === undefined) {
  const [,,input, output] = process.argv
  runStream(input, output).catch(console.error)
}
