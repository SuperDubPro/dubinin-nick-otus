console.log('start') // 1

const interval = setInterval(() => {
  console.log('setInterval') // 4, 8
}, 0)

setTimeout(() => {
  console.log('setTimeout 1') // 5
  Promise.resolve().then(() => {
    console.log('promise 3') // 6
  }).then(() => {
    console.log('promise 4') // 7
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2') // 9
      Promise.resolve().then(() => {
        console.log('promise 5') // 10
      }).then(() => {
        console.log('promise 6') // 11
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {
  console.log('promise 1') // 2
}).then(() => {
  console.log('promise 2') // 3
})

