const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect('mongodb+srv://anmolgupta081202:anmol08@cluster0.hbygl3s.mongodb.net/talkoholic');

const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database : MongoDB');
});

module.exports = db;