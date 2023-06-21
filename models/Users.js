const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  namaLengkap: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Users', usersSchema);
