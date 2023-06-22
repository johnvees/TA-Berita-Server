const Kategori = require('../models/Kategori');

module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard', {
      title: 'Kurator Berita Admin | Dashboard',
    });
  },

  viewKategori: async (req, res) => {
    try {
      const kategori = await Kategori.find();
      // console.log(kategori);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/kategori/view_kategori', {
        kategori,
        alert,
        title: 'Kurator Berita Admin | Kategori',
      });
    } catch (error) {
      res.redirect('/admin/kategori');
    }
  },
  addKategori: async (req, res) => {
    try {
      const { jenis } = req.body;
      // console.log(jenis);
      await Kategori.create({ jenis });
      req.flash('alertMessage', 'Berhasil Menambahkan Kategori Baru');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori');
    } catch (error) {
      req.flash('alertMessage', `$error.message`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },
  editKategori: async (req, res) => {
    try {
      const { id, jenis } = req.body;
      const kategori = await Kategori.findOne({ _id: id });
      // console.log(kategori);
      kategori.jenis = jenis;
      await kategori.save();
      req.flash('alertMessage', 'Berhasil Merubah Kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori');
    } catch (error) {
      req.flash('alertMessage', `$error.message`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },
  deleteKategori: async (req, res) => {
    try {
      const { id } = req.params;
      await Kategori.findOneAndDelete({ _id: id });
      // console.log(kategori);
      // await kategori.remove();
      req.flash('alertMessage', 'Berhasil Menghapus Kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori');
    } catch (error) {
      req.flash('alertMessage', `$error.message`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },

  viewUsers: (req, res) => {
    res.render('admin/users/view_users', {
      title: 'Kurator Berita Admin | Users',
    });
  },

  viewBerita: (req, res) => {
    res.render('admin/berita/view_berita', {
      title: 'Kurator Berita Admin | Berita',
    });
  },

  viewPencarian: (req, res) => {
    res.render('admin/pencarian/view_pencarian', {
      title: 'Kurator Berita Admin | Pencarian',
    });
  },
};
