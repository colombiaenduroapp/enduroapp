const route = require('express').Router();

const evento = require('../controllers/evento.controller');

route.route('/evento').get(evento.getEvento)
route.route('/evento/image/:ev_img').get(evento.getImage)
// route.route('/evento/imagejersey/:sd_logo').get(sede.getImageJersey)
// route.route('/evento/:sd_cdgo').get(sede.searchSede)
// route.route('/sede/mesa/:sd_cdgo').get(sede.getMesaSede)
route.route('/evento').post(evento.addEvento)
// route.route('/sede/:sd_cdgo').post(sede.updateSede)




module.exports=route