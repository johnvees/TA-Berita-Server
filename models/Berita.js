const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  date: Date,
  imageUrl: String,
  link: String,
});

module.exports = mongoose.model('Berita', beritaSchema);
