const router = require('express').Router();


router.use('/sede', require('./sede.route'));
router.use(require('./ciudad.route'));
router.use(require('./evento.route'));
router.use(require('./empresa.route'));


module.exports = router