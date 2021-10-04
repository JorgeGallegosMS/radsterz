const mongoose = require("mongoose");
const { databaseURL } = require("../vars");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(databaseURL, options);

mongoose.connection.on("connected", () => {
  // mongoose.connection.dropDatabase()
  // console.log('Connectedddd')
});

module.exports = mongoose.connection;
