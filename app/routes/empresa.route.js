const router = require('express').Router();
const empresa = require('../controllers/empresa.controller');


router.get('/', empresa.getEmpresa)
router.get('/image/:em_img', empresa.getImage)
router.get('/:em_cdgo', empresa.searchEmpresa)
router.post('/', empresa.addEmpresa)
router.delete('/:em_cdgo', empresa.deleteEmpresa)



module.exports = router