const Kategori = require('../models/Kategori');
const Berita = require('../models/Berita');
const Users = require('../models/Users');
// const Pencarian = require('../models/Pencarian');
const bycrypt = require('bcryptjs');
const axios = require('axios');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render('index', {
          alert,
          title: 'Kurator Berita Admin | Login',
        });
      } else {
        res.redirect('/admin/dashboard');
      }
      // console.log(category);
    } catch (error) {
      res.redirect('/admin/signin');
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
        req.flash('alertMessage', 'User Not Found');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
        return;
      }
      const isPasswordMatch = await bycrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash('alertMessage', 'Password Not Correct');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
        return;
      }

      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.redirect('/admin/dashboard');
    } catch (error) {
      res.redirect('/admin/signin');
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin');
  },

  viewDashboard: async (req, res) => {
    try {
      const users = await Users.find();
      const berita = await Berita.find();
      const kategori = await Kategori.find();
      res.render('admin/dashboard/view_dashboard', {
        title: 'Kurator Berita Admin | Dashboard',
        user: req.session.user,
        users,
        berita,
        kategori,
      });
    } catch (error) {
      res.redirect('/admin/dashboard');
    }
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
        user: req.session.user,
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

  viewUsers: async (req, res) => {
    try {
      const users = await Users.find();
      // console.log(kategori);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/users/view_users', {
        users,
        alert,
        title: 'Kurator Berita Admin | Users',
        user: req.session.user,
      });
    } catch (error) {
      res.redirect('/admin/users');
    }
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
        action: 'view',
        user: req.session.user,
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
  addBeritaApi1: async (req, res) => {
    try {
      const { kategoriId, newsId } = req.body;
      // Fetch data from the external API
      const response = await axios.get(
        `https://berita-indo-api.vercel.app/v1/${newsId}`
      );
      const kategori = await Kategori.findOne({ _id: kategoriId });
      console.log(response.data.data.length);
      for (let index = 0; index < response.data.data.length; index++) {
        const beritaBaru = {
          kategoriId: kategori._id,
          judul: response.data.data[index].title,
          isi: response.data.data[index].contentSnippet,
          date: response.data.data[index].isoDate,
          imageUrl: response.data.data[index].image.small,
          link: response.data.data[index].link,
        };
        console.log(beritaBaru);
        const berita = await Berita.create(beritaBaru);
        kategori.beritaId.push({ _id: berita._id });
        await kategori.save();
      }

      req.flash('alertMessage', 'Berhasil Menambahkan Berita Baru');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/berita');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  addBeritaApi2: async (req, res) => {
    try {
      const { kategoriId, newsId } = req.body;
      // Fetch data from the external API
      const response = await axios.get(
        `https://berita-indo-api.vercel.app/v1/${newsId}`
      );
      const kategori = await Kategori.findOne({ _id: kategoriId });
      console.log(response.data.data.length);
      for (let index = 0; index < response.data.data.length; index++) {
        const beritaBaru = {
          kategoriId: kategori._id,
          judul: response.data.data[index].title,
          isi: response.data.data[index].content,
          date: response.data.data[index].isoDate,
          imageUrl: response.data.data[index].image.small,
          link: response.data.data[index].link,
        };
        console.log(beritaBaru);
        const berita = await Berita.create(beritaBaru);
        kategori.beritaId.push({ _id: berita._id });
        await kategori.save();
      }

      req.flash('alertMessage', 'Berhasil Menambahkan Berita Baru');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/berita');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  addBeritaApi3: async (req, res) => {
    try {
      const { kategoriId, newsId } = req.body;
      // Fetch data from the external API
      const response = await axios.get(
        `https://berita-indo-api.vercel.app/v1/${newsId}`
      );
      const kategori = await Kategori.findOne({ _id: kategoriId });
      console.log(response.data.data.length);
      for (let index = 0; index < response.data.data.length; index++) {
        const beritaBaru = {
          kategoriId: kategori._id,
          judul: response.data.data[index].title,
          isi: response.data.data[index].description,
          date: response.data.data[index].isoDate,
          imageUrl: response.data.data[index].image.small,
          link: response.data.data[index].link,
        };
        console.log(beritaBaru);
        const berita = await Berita.create(beritaBaru);
        kategori.beritaId.push({ _id: berita._id });
        await kategori.save();
      }

      req.flash('alertMessage', 'Berhasil Menambahkan Berita Baru');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/berita');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  showEditBerita: async (req, res) => {
    try {
      const { id } = req.params;
      const berita = await Berita.findOne({ _id: id }).populate({
        path: 'kategoriId',
        select: 'id jenis',
      });
      const kategori = await Kategori.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/berita/view_berita', {
        kategori,
        berita,
        alert,
        title: 'Kurator Berita Admin | Update Berita',
        action: 'update',
        user: req.session.user,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  editBerita: async (req, res) => {
    try {
      const { id } = req.params;
      const berita = await Berita.findOne({ _id: id }).populate({
        path: 'kategoriId',
        select: 'id jenis',
      });
      const { kategoriId, judul, isi, tanggal, gambar, url } = req.body;
      berita.judul = judul;
      berita.isi = isi;
      berita.date = tanggal;
      berita.imageUrl = gambar;
      berita.link = url;
      berita.kategoriId = kategoriId;
      await berita.save();
      req.flash('alertMessage', 'Berhasil Mengubah Berita');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/berita');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/berita');
    }
  },
  deleteBerita: async (req, res) => {
    try {
      const { id } = req.params;
      await Berita.findOneAndDelete({ _id: id }).populate({
        path: 'kategoriId',
        select: 'id jenis',
      });
      req.flash('alertMessage', 'Berhasil Menghapus Berita');
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
      user: req.session.user,
    });
  },
};
