const router = require('express').Router();

router.use('/sede', require('./sede.route'));
router.use('/ciudad', require('./ciudad.route'));
router.use('/evento', require('./evento.route'));
router.use('/empresa', require('./empresa.route'));
router.use('/tipo_convenios', require('./tipoConvenios.route'))

module.exports = router