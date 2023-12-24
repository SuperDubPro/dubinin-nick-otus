const iterable = {
  [Symbol.iterator]() {
    let step = 0
    const iterator = {
      next() {
        if (step <= 2) {
          step++
        }
        switch (step) {
          case 1:
            return  { value: 'hello', done: false }
          case 2:
            return  { value: 'world', done: false }
          default:
            return  { value: undefined, done: true }
        }
      }
    }
  }
}

const str = 'hi'
const iterator = str[Symbol.iterator]()

// for (let i of iterator) {
//   console.log(i)
// }

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
