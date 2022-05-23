const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');

const logger = require('./debugging/logger');
const users = require('./routes/api/users');
const files = require('./routes/api/files');
const settings = require('./routes/api/settings');
const rsvp = require('./routes/api/rsvp');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

// GZIP compression
app.use(
  compression({
    filter: shouldCompress,
  }),
);

// Cors Middleware
app.use(cors());

// Database Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/files', files);
app.use('/api/settings', settings);
app.use('/api/rsvp', rsvp);

// Serve images folder
app.use(express.static(`${__dirname}/images`));
app.use(express.static(`${__dirname}/imagesDownload`));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server running on port ${port}`));

module.exports = app;
