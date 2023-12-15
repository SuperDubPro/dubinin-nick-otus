const fs = require('fs')

setTimeout(() => {
  console.log('outer timeout')
}, 0)

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})
