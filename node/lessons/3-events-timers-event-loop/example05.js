const EventEmitter = require('events')

class MyThing extends EventEmitter {
  constructor() {
    super();
    // this.emit('thing1')

    setImmediate(() => {
      this.emit('thing1')
    })
     setImmediate(() => {
      this.emit('thing2')
    })

    new Promise((res) => {
      setTimeout(() => {
        this.emit('thing5')
      }, 0)
      return res(1);
    }).then(() => {
      setTimeout(() => {
        this.emit('thing4')
      }, 0)
    })

    setTimeout(() => {
      this.emit('thing3')
    }, 0)
  }
}

const mt = new MyThing()

mt.on('thing1', function onThing1() {
  console.log('thing1')
})
mt.on('thing2', function onThing1() {
  console.log('thing2')
})
mt.on('thing3', function onThing1() {
  console.log('thing3')
})
mt.on('thing4', function onThing1() {
  console.log('thing4')
})
mt.on('thing5', function onThing1() {
  console.log('thing5')
})
