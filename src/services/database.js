const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb://nurluthfy:${process.env.DB_PASSWORD}@cluster0-shard-00-00.a0x87.mongodb.net:27017,cluster0-shard-00-01.a0x87.mongodb.net:27017,cluster0-shard-00-02.a0x87.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-rt40eu-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Terhubung ke database');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDB };
