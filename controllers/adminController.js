const Kategori = require('../models/Kategori');

module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },

  viewKategori: async (req, res) => {
    const kategori = await Kategori.find();
    // console.log(kategori);
    res.render('admin/kategori/view_kategori', { kategori });
  },
  addKategori: async (req, res) => {
    const { jenis } = req.body;
    // console.log(jenis);
    await Kategori.create({ jenis });
    res.redirect('/admin/kategori');
  },
  editKategori: async (req, res) => {
    const { id, jenis } = req.body;
    const kategori = await Kategori.findOne({ _id: id });
    // console.log(kategori);
    kategori.jenis = jenis;
    await kategori.save();
    res.redirect('/admin/kategori');
  },

  viewUsers: (req, res) => {
    res.render('admin/users/view_users');
  },

  viewBerita: (req, res) => {
    res.render('admin/berita/view_berita');
  },

  viewPencarian: (req, res) => {
    res.render('admin/pencarian/view_pencarian');
  },
};
