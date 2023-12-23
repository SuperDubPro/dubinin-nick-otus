const fs = require('fs')

fs.readFile(__filename, () => {
  console.log('fs')
  setTimeout(() => console.log('timeout'))
  setImmediate(() => console.log('immediate'))
})
