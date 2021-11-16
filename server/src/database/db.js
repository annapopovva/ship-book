const adminConfig = require('./admin');

const dbName = 'shipBook';
const dbUrl = `mongodb+srv://${adminConfig.admin}:${adminConfig.password}@shipscluster.5d6dk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
    db: dbUrl
};