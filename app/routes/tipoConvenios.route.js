const router = require('express').Router();
const tipoConvenios = require('../controllers/tipoConvenios.controller')

router.get('/', tipoConvenios.getTipoConvenios)

module.exports = router