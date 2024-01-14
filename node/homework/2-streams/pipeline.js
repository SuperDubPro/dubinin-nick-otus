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

const getOutputValue = async () => {
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

const sortPipe = new stream.Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback()
    console.log('2 chunk', String(chunk))
    console.log('encoding', encoding)
  }
})

const mockReadStream = new ReadableStream({
  async start(controller) {
    controller.enqueue('a c\n')
    controller.enqueue('b b')
    controller.close()
  },
})

const runPipeline = async (input, output) => {
  return pipeline(
    // fs.createReadStream(input),
    mockReadStream,
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
        console.log('1 chunk', chunk)

        yield chunk
      }
    },
    sortPipe,
    /** Как сортировать в пайплайне? */
    fs.createWriteStream(output),
  )
}

module.exports = {
  runPipeline,
}

// Исполняется если не автотест
if (process.env.JEST_WORKER_ID === undefined) {
  const [,,input, output] = process.argv
  runPipeline(input, output).catch(console.error)
}
