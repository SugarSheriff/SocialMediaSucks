const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./models'); 
const routes = require('./routes');
const config = require('./config');
const models = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configure session and authentication middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define your Passport.js configuration for user authentication here

// Routes
app.use(routes);

// Start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const sessionSecret = process.env.SESSION_SECRET;
const port = process.env.PORT || 3000;
