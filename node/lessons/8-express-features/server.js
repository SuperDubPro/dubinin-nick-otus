const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log(new Date().toISOString())
  next()
})

const loggingMw = (_, res, next) => {
  console.log('MW')
  next()
}

const getUsers = (req, res, next) => {
  console.log('PREPARE CACHE', )
  cache[req.url] = JSON.stringify([req.url])
}

const cache = {}
const cashingMw = (req, res, next) => {
  console.log(req.url)
  if (cache[req.url]) {
    console.log('SERVING CACHE')
    res.send(cache[req.url])
  } else {
    next()
  }
}

app.get('/person', cashingMw, loggingMw, getUsers)
app.get('/person/:id', (req, res) =>
  res.send(JSON.stringify({ name: 'Ivan', id: req.params.id }))
)

app.get('/:region/catalog/:id', (req, res) =>
  res.send(JSON.stringify({ region: req.params.region, id: req.params.id }))
)

app.listen(3000)
