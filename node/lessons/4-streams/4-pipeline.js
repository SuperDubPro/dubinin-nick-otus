const util = require('util')
const stream = require('stream')
const fs = require('fs')
const zlib = require('zlib')

const pipeline = util.promisify(stream.pipeline)

async function run() {
  await pipeline(
    fs.createReadStream('txt.txt'),
    zlib.createGzip(),
    fs.createWriteStream('txt.txt.gz')
  )
  console.log('Pipeline succeeded.')
}

run().catch(console.error)
