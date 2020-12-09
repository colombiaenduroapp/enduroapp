
const route = require('express').Router();

const sede = require('../controllers/sede.controller');

route.route('/sede').get(sede.getSede)
route.route('/sede/image/:sd_logo').get(sede.getImage)
route.route('/sede/imagejersey/:sd_logo').get(sede.getImageJersey)
route.route('/sede/:sd_cdgo').get(sede.searchSede)
route.route('/sede/mesa/:sd_cdgo').get(sede.getMesaSede)
route.route('/sede').post(sede.addSede)
route.route('/sede/:sd_cdgo').post(sede.updateSede)




module.exports=route