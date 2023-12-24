;(async () => {
  const obj = { key: 'value' }

  Error.captureStackTrace(obj)

  console.log(obj.stack)
})()
