const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

// endpoint kategori
router.get('/kategori', adminController.viewKategori);
router.post('/kategori', adminController.addKategori);
router.put('/kategori', adminController.editKategori);
router.delete('/kategori/:id', adminController.deleteKategori);

router.get('/users', adminController.viewUsers);

// endpoint berita
router.get('/berita', adminController.viewBerita);
router.post('/berita', adminController.addBerita);
router.get('/berita/:id', adminController.showEditBerita);
router.put('/berita/:id', adminController.editBerita);
router.delete('/berita/:id', adminController.deleteBerita);

router.get('/pencarian', adminController.viewPencarian);

module.exports = router;
