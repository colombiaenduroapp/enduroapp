
const route = require('express').Router();

const sede = require('../controllers/sede.controller');

route.route('/sede').get(sede.getSede)
// route.route('/ciudad:cd_cdgo').get(getOneCiudad)
// route.route('/ciudad').post(ciudad.addCiudad)
// route.route('/ciudad:cd_cdgo').put(editCiudad)
// route.route('/ciudad:cd_cdgo').delete(deleteCiudad)


module.exports=route