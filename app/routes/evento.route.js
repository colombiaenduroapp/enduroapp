const router = require('express').Router();
const eventos = require('../controllers/evento.controller');

router.get('/', eventos.getEventos)
router.get('/image/:ev_img', eventos.getImage)
router.post('/', eventos.addEvento)
router.get('/:ev_cdgo', eventos.searchEvento)
/*router.post('/:ev_cdgo', evento.updateEvento) */

module.exports = router