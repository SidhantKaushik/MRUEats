require('dotenv').config();
const mongoose = require('mongoose');
const connect = () => {
    const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: 'MRU-Eats'
    };
    mongoose.connect(process.env.MONGO_URL, opt);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("Connected to Mongo");
    });
};

module.exports = {
    connect
};