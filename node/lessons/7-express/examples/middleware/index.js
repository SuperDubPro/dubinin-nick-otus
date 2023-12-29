// Логгирование
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Аутентификация
const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Необходима аутентификация');
};

app.get('/profile', authenticate, (req, res) => {
  res.send('Добро пожаловать в личный кабинет');
});

// Сессии
const session = require('express-session');
app.use(session({ secret: 'mysecretkey', resave: true, saveUninitialized: true }));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // для разбора JSON данных
app.use(bodyParser.urlencoded({ extended: true })); // для разбора данных формы

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});
