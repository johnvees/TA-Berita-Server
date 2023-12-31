const Kategori = require('../models/Kategori');
const Berita = require('../models/Berita');

module.exports = {
  listBerita: async (req, res) => {
    try {
      const berita = await Berita.find()
        .select('_id judul isi date imageUrl link')
        .populate({ path: 'kategoriId', select: '_id jenis' });

      res.status(200).json({ berita });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  listKategori: async (req, res) => {
    try {
      const kategori = await Kategori.find().select('_id jenis');

      res.status(200).json({ kategori });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addKategori: async (req, res) => {
    try {
      const { jenis } = req.body;

      if (jenis === '') {
        res.status(404).json({ message: 'gagal' });
      }
      await Kategori.create({ jenis });
      res.status(200).json({ message: 'berhasil' });
      res.status(201).json({ message: 'berhasil' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
