const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Список пользователей');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Информация о пользователе с ID ${userId}`);
});

module.exports = router;
