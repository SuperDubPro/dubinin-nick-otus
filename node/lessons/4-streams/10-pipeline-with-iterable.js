const util = require('util')
const stream = require('stream')
const fs = require('fs')

const pipeline = util.promisify(stream.pipeline)

async function run() {
  await pipeline(
    fs.createReadStream('txt.txt'),
    async function* (source) {
      for await (const chunk of source) {
        console.log(String(chunk).toUpperCase())
        yield String(chunk).toUpperCase()
      }
    },
      fs.createWriteStream('txtUpperCase.txt'),
  )
  console.log('Pipeline succeeded!')
}

run().catch(console.error)
