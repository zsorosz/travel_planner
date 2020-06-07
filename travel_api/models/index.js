const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.DATABASEURL;
mongoose.set('debug', true);
mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

mongoose.Promise = Promise;
module.exports.User = require('./user');