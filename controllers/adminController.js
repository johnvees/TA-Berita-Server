const Kategori = require('../models/Kategori');
const Berita = require('../models/Berita');

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
      req.flash('alertMessage', `${error.message}`);
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
      req.flash('alertMessage', `${error.message}`);
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
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },

  viewUsers: (req, res) => {
    res.render('admin/users/view_users', {
      title: 'Kurator Berita Admin | Users',
    });
  },

  viewBerita: async (req, res) => {
    try {
      const berita = await Berita.find().populate({
        path: 'kategoriId',
        select: 'id jenis',
      });
      const kategori = await Kategori.find();
      // console.log(berita[1].kategoriId.jenis);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/berita/view_berita', {
        title: 'Kurator Berita Admin | Berita',
        kategori,
        berita,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  addBerita: async (req, res) => {
    try {
      const { kategoriId, judul, isi, tanggal, gambar, url } = req.body;
      const kategori = await Kategori.findOne({ _id: kategoriId });
      // console.log(judul);
      const beritaBaru = {
        kategoriId: kategori._id,
        judul,
        isi,
        date: tanggal,
        imageUrl: gambar,
        link: url,
      };
      const berita = await Berita.create(beritaBaru);
      kategori.beritaId.push({ _id: berita._id });
      await kategori.save();
      req.flash('alertMessage', 'Berhasil Menambahkan Berita Baru');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/berita');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },

  viewPencarian: (req, res) => {
    res.render('admin/pencarian/view_pencarian', {
      title: 'Kurator Berita Admin | Pencarian',
    });
  },
};
