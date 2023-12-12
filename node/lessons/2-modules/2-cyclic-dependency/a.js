exports.c = 'c'
console.log('a: before b require')

const b = require('./b')
console.log('a: b.b = ', b.b)
exports.a = 'a'
console.log('a: finished')
b.run()
