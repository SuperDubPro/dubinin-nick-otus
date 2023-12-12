const a = require('./a')
const b = require('./b')

console.log('a.test ', a.test)

b.run()
console.log('a.test after b.run()', a.test)

const aNew = require('./a')
console.log('aNew.test', aNew.test)
