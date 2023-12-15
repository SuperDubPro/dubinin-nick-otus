const crypto = require('crypto')

process.env.UV_THREADPOOL_SIZE = '2' // тут не сработает походу

const start = Date.now()

crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
crypto.pbkdf2('mypassword', 'salt', 100_000, 1024, 'sha512', () => {
  console.log(Date.now() - start)
})
