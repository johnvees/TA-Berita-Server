const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

router.get('/kategori', adminController.viewKategori);

router.get('/users', adminController.viewUsers);

router.get('/berita', adminController.viewBerita);

router.get('/pencarian', adminController.viewPencarian);

module.exports = router;
