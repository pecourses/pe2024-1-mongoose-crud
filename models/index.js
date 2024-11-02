const mongoose = require('mongoose');
const env = process.env.NOVE_ENV ?? 'development';
const config = require('./../configs/mongoDb.json')[env];

const { host, port, dbName } = config;

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection to MongoDB is established'))
  .catch(err => console.log(err));

module.exports.User = require('./user');
