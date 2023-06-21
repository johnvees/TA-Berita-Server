const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const topik = new Schema({ topikBerita: String, required: true });
const similarity = new Schema({
  cosSin: mongoose.Types.Decimal128,
  required: true,
});

const pencarianSchema = new mongoose.Schema({
  kataKunci: {
    type: String,
    required: true,
  },
  minSimilarity: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  cosSin: { type: [similarity], default: [] },
  topikBerita: { type: [topik], default: [] },
  beritaId: [
    {
      type: ObjectId,
      ref: 'Berita',
    },
  ],
  kategoriId: [
    {
      type: ObjectId,
      ref: 'Kategori',
    },
  ],
});

module.exports = mongoose.model('Pencarian', pencarianSchema);
