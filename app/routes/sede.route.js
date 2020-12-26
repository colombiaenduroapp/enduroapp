const router = require('express').Router();
const sede = require('../controllers/sede.controller');

router.get('/', sede.getSede)
router.get('/:sd_cdgo', sede.searchSede)
router.get('/image/:sd_logo', sede.getImage)
router.get('/imagejersey/:sd_logo', sede.getImageJersey)
router.get('/mesa/:sd_cdgo', sede.getMesaSede)
router.post('/', sede.addSede)
router.post('/:sd_cdgo', sede.updateSede)


module.exports = router