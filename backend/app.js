require('dotenv').config();
// const path = require('path');
// const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const DB_ADDRESS = require('./config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, {});
// app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger); // подключаем логгер запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
