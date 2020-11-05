
const route = require('express').Router();

const {getCiudad,getOneCiudad,addCiudad,editCiudad,deleteCiudad}= require('../controllers/ciudad.controller')

route.route('/ciudad').get(getCiudad)
route.route('/ciudad:cd_cdgo').get(getOneCiudad)
route.route('/ciudad').post(addCiudad)
route.route('/ciudad:cd_cdgo').put(editCiudad)
route.route('/ciudad:cd_cdgo').delete(deleteCiudad)


module.exports=route