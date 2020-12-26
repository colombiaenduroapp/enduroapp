const router = require('express').Router();


router.use('/sede', require('./sede.route'));
router.use('/ciudad',require('./ciudad.route'));
router.use('/evento',require('./evento.route'));
router.use('/empresa',require('./empresa.route'));


module.exports = router