const express = require('express')
const app = express()






app.use(express.urlencoded({extended: false}))




//routes


//--------routes ciudad
app.use(require('./routes/ciudad.route'));
app.use(require('./routes/sede.route'));
// // //--------routes sede
// app.use(require('./routes/sede.route'));
// //--------routes empresa
// app.use(require('./routes/empresa.route'));



module.exports=app