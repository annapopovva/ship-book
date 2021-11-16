//npm run dev
const express = require('express'),
chalk = require('chalk'),
debug = require('debug')('index'); // set DEBUG=* & node index.js || set DEBUG=index & npm run dev
path = require('path'),
cors = require('cors'),
bodyParser = require('body-parser');


const app = express();
// Used port
const PORT = process.env.PORT || 3000;

const shipRouter = require('./src/routes/ships.router');

// Setting up 
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Pictures access
app.use('/uploads', express.static(path.join('uploads')));


// Routes
app.use ('/ships', shipRouter);

// Index Route
app.get('/', (req, res) => {
    res.render('Ships');
});

// Start Server
app.listen(PORT, () => debug(`Server started on port ${chalk.green(PORT)}`));

// Find 404 and hand over to error handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

// Error handling
app.use(function(error, req, res, next) {
    debug(error.message);
    if(!error.statusCode) error.statusCode = 500; // Set error code to 'Internal Server Error (500)'
    res.status(error.statusCode).send(error.message);
});

// MongoDB connection
const mongoose = require('mongoose');
const dbConfig = require('./src/database/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
})
    .then(() => {
        debug('Sucessfully connected to the database!');
    },
    error => {
        debug(`Could not connect to the database: ${error}`);
    }
    );

