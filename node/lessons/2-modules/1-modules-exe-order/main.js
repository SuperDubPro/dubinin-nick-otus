console.log('main: 1')
const { doSomething } = require('./doSomething')
console.log('main: 2')

const main = () => {
  doSomething()
}
console.log('main: 3')

main()

console.log('main: 4')
