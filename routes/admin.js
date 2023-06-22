const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

// endpoint kategori
router.get('/kategori', adminController.viewKategori);
router.post('/kategori', adminController.addKategori);
router.put('/kategori', adminController.editKategori);
router.delete('/kategori/:id', adminController.deleteKategori);

router.get('/users', adminController.viewUsers);

router.get('/berita', adminController.viewBerita);

router.get('/pencarian', adminController.viewPencarian);

module.exports = router;
