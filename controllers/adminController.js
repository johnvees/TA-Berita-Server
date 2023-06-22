const Kategori = require('../models/Kategori');

module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },

  viewKategori: (req, res) => {
    res.render('admin/kategori/view_kategori');
  },
  addKategori: async (req, res) => {
    const { jenis } = req.body;
    // console.log(jenis);
    await Kategori.create({ jenis });
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
