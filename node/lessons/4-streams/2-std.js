const stream = require('stream')
const readable = (function() {
  const data = []
  const $ = new stream.Readable({ objectMode: false, read() {}})
  $.push('{ \"a\": 1 }')
  $.push('{ \"a\": 2 }')
  $.push('{ \"a\": 3 }')
  setTimeout(() => {
    $.emit('close')
  })
  return $
})()

const data = []

readable.on('data', (chunk) => {
  data.push(chunk)
  console.log('data processed')
})

readable.on('close', () => {
  console.log(Buffer.concat(data).toString())
})
