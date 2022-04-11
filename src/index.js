const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./services/database');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { registerRouter } = require('./routes/register');
const { loginRouter } = require('./routes/login');
const { logoutRouter } = require('./routes/logout');
const { currentUserRouter } = require('./routes/currentUser');
const { commentsRouter } = require('./routes/comments');
const { repliesRouter } = require('./routes/replies');
const moment = require('moment');

app.use(cors({ credentials: true, origin: true }));
app.use(
  cookieSession({
    signed: false,
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);
app.use(commentsRouter);
app.use(repliesRouter);

app.all('*', (req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(3001, () => {
  console.log(moment('2022-04-08T18:56:50.000Z').fromNow());
  connectDB();
  console.log('Berjalan pada port 3001');
});
