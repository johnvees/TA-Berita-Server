const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const kategoriSchema = new mongoose.Schema({
  jenis: {
    type: String,
    required: true,
  },
  beritaId: [
    {
      type: ObjectId,
      ref: 'Berita',
    },
  ],
});

module.exports = mongoose.model('Kategori', kategoriSchema);
