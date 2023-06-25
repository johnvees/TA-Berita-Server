const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

router.get('/signin', adminController.viewSignin);
router.post('/signin', adminController.actionSignin);
router.use(auth);
router.get('/logout', adminController.actionLogout);
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
router.post('/berita/1', adminController.addBeritaApi1);
router.post('/berita/2', adminController.addBeritaApi2);
router.post('/berita/3', adminController.addBeritaApi3);
router.get('/berita/:id', adminController.showEditBerita);
router.put('/berita/:id', adminController.editBerita);
router.delete('/berita/:id', adminController.deleteBerita);

router.get('/pencarian', adminController.viewPencarian);

module.exports = router;
