const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const createError = require('http-errors');
const sslRedirect = require('heroku-ssl-redirect').default;

require('dotenv').config();

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');

/**
 *  Connect to MongoDB
 */
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_PATH, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + process.env.MONGO_DB_PATH);
});

/**
 * Create Express App
 */
const app = express();
const port = process.env.PORT || 8080;

app.use(sslRedirect());
app.use(logger('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
