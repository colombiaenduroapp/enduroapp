const router = require('express').Router();
const sedes = require('../controllers/sede.controller');

router.get('/', sedes.getSedes)
// router.get('/:sd_cdgo', sede.searchSede)
router.get('/image/:sd_logo', sedes.getImage)
router.get('/imagejersey/:sd_logo', sedes.getImageJersey)
// router.get('/mesa/:sd_cdgo', sede.getMesaSede)
router.post('/', sedes.addSede)
// router.post('/:sd_cdgo', sede.updateSede)


module.exports = router