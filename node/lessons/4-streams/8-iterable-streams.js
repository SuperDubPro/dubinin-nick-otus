const fs = require('fs')

const readStream = fs.createReadStream('./txt.txt', { encoding: 'utf8' })

async function print() {
  for await (const chunk of readStream) {
    console.log(chunk)
  }
}

print()
