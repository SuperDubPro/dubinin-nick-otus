const util = require('util')
const strem = require('stream')
const fs = require('fs')

const finished = util.promisify(strem.finished)
const rs = fs.createReadStream('txt.txt')

async function run() {
  await finished(rs)
  console.log('Stream is done reading.')
}

run().catch(console.error)
rs.resume()
