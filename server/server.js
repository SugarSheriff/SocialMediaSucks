const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const otherRoutes = require('./routes/otherRoutes');
const { PORT } = require('./config/config');

const app = express();

// Middleware: Body Parser
app.use(bodyParser.json());

// Middleware: Log Request
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Path: ${req.path}`);
  next(); // Call the next middleware in the stack
});

// MongoDB Atlas Connection String
const uri =
    "mongodb+srv://SugarSheriff:ku1TrAy11KFvxSig@socialmediasucks.xzh9tpk.mongodb.net/?retryWrites=true&w=majority"

async function connect () {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
    }

connect();

// Mount API routes
app.use('/api', apiRoutes);

// Mount Other routes
app.use('/other', otherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
