const fs = require('fs')

setTimeout(() => console.log('timeout'))
setImmediate(() => console.log('immediate'))

fs.readFile(__filename, () => console.log('fs'))
