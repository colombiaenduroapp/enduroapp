
const route = require('express').Router();

const ciudad= require('../controllers/ciudad.controller')

route.route('/').get(ciudad.getCiudad)
// route.route('/ciudad:cd_cdgo').get(getOneCiudad)

// route.route('/ciudad/image').post(ciudad.addImage)
route.route('/').post(ciudad.addCiudad)
// route.route('/ciudad:cd_cdgo').put(editCiudad)
// route.route('/ciudad:cd_cdgo').delete(deleteCiudad)


module.exports=route