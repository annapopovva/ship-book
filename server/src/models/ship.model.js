const mongoose = require('mongoose');

let Ship = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    imo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pictures: {
        type: [Object],
        required: true
    }
},  {
        collection: 'ships'
    }
);

module.exports = mongoose.model('Ship', Ship);