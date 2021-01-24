const mongoose = require('mongoose');
const cft = require('../config')

let username = cft.get('db').username;
let password = cft.get('db').password;
let dbfeedname = cft.get('db').dbfeeds;
let host = cft.get('db').host;

let dsn = `mongodb+srv://${username}:${password}@${host}/${dbfeedname}?retryWrites=true&w=majority`;


mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log('Could not connect to database: ', err);
        }
        console.log('Successfully conneted to database');
    }
);

