const express = require('express')
const app = express()
const port = process.env.port || 5000



app.set('port',port)


app.use(express.urlencoded({extended: false}))




//routes


//--------routes ciudad
app.use(require('./routes/ciudad.route'));
//--------routes sede
app.use(require('./routes/sede.route'));
//--------routes empresa
app.use(require('./routes/empresa.route'));



module.exports=app