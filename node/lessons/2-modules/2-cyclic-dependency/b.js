console.log('b: before a require')
const a = require('./a')

console.log('b: a.a = ', a.a)
console.log('b: a.c = ', a.c)

exports.b = 'b'
exports.run = () => {
  console.log('run a: ', a)
}
