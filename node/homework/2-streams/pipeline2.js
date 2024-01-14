const util = require('util')
const stream = require('stream')
const { ReadableStream } = require('node:stream/web')
const fs = require('fs')

const pipeline = util.promisify(stream.pipeline)

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

const mockReadStream = new ReadableStream({
  async start(controller) {
    controller.enqueue('a c\n')
    controller.enqueue('b b')
    controller.close()
  },
})

const runPipeline2 = async (inputFileName, outputFileName) => {
  return new Promise(async (res, rej) => {
    try {
      await pipeline(
        fs.createReadStream(inputFileName),
        // mockReadStream,
        async function* (source) {
          for await (const chunk of source) {
            const arr = splitString(String(chunk))

            arr.forEach((str) => {
              if (!dictionary[str]) {
                dictionary[str] = 1
                return
              }
              dictionary[str]++
            })

            yield chunk
          }
        },
      )
      const output = getOutputValue()
      const writer = fs.createWriteStream(outputFileName)
      writer.write(output)
      res(output)
    } catch (err) {
      rej(err)
    }
  })
}

module.exports = {
  runPipeline2,
}

// Исполняется если не автотест
if (process.env.JEST_WORKER_ID === undefined) {
  const [,,input, output] = process.argv
  runPipeline2(input, output).catch(console.error)
}
