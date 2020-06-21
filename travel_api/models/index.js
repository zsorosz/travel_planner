const mongoose = require('mongoose');
require('dotenv').config();
const databaseUrl = process.env.DATABASEURL;
mongoose.set('debug', true);
mongoose.connect(databaseUrl, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

mongoose.Promise = Promise;
module.exports.User = require('./user');