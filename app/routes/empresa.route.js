
const route = require('express').Router();

const empresa = require('../controllers/empresa.controller');

route.route('/empresa').get(empresa.getEmpresa)
route.route('/empresa/image/:ev_img').get(empresa.getImage)
// // route.route('/evento/imagejersey/:sd_logo').get(sede.getImageJersey)
route.route('/empresa/:em_cdgo').get(empresa.searchEmpresa)
// // route.route('/sede/mesa/:sd_cdgo').get(sede.getMesaSede)
route.route('/empresa').post(empresa.addEmpresa)
// route.route('/evento/:ev_cdgo').post(evento.updateEvento)




module.exports=route