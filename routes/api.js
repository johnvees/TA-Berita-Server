const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.get('/list-berita', apiController.listBerita);
router.get('/list-kategori', apiController.listKategori);
router.post('/add-kategori', apiController.addKategori);

module.exports = router;
