const mongoose = require('mongoose');

const dbConfig = require('./db');

// MongoDB connection
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

//module.exports = mongoose;