const router = require('express').Router();
const sedes = require('../controllers/sede.controller');

router.get('/', sedes.getSedes)
router.get('/:sd_cdgo', sedes.searchSede)
router.get('/image/:sd_logo', sedes.getImage)
router.get('/imagejersey/:sd_logo', sedes.getImageJersey)
router.post('/', sedes.addSede)
router.put('/:sd_cdgo', sedes.updateSede)
router.delete('/:sd_cdgo', sedes.deleteSede)


module.exports = router