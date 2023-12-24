const http = require('http')

http.createServer((req, res) => {
  const { headers, method, url } = req
  let body = []

  req
    .on('data', (chunk) => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString()
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      const resBody = { headers, method, url, body }
      res.write(JSON.stringify(resBody))
      res.end()
    })
})
  .listen(8080)
