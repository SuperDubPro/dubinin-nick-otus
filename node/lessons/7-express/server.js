const express = require("express");
const routes = require('./routes'); // Путь к вашему маршрутизатору

;(() => {
  const app = express();

  app.use('/users', routes);

  app.get('/hello', (req, res) => {
    res.send('Hello world');
  });

  app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
  });

  app.get('/hello/json', (req, res) => {
    res.json({ message: 'Hello world' });
  });

  app.get('/error', (req, res) => {
    throw new Error('some error');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
  });
  

  app.listen(8080);

  console.log('Server started on 8080 port');
})();
