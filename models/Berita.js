const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const beritaSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  link: {
    type: String,
  },
  kategoriId: {
    type: ObjectId,
    ref: 'Kategori',
  },
});

module.exports = mongoose.model('Berita', beritaSchema);
