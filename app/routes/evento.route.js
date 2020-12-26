const router = require('express').Router();
const evento = require('../controllers/evento.controller');


router.get('/', evento.getEvento)
router.get('/image/:ev_img', evento.getImage)
router.get('/:ev_cdgo', evento.searchEvento)
router.post('/', evento.addEvento)
router.post('/:ev_cdgo', evento.updateEvento)



module.exports = router