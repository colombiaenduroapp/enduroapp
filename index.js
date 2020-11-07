
const app= require('./app/app')
require('./app/config/conection')

app.listen(process.env.PORT || 5000, '0.0.0.0',(error)=>{
    if(error){
        console.log(`ha ocurrido un error: ${error}`)
    } else{
     console.log(`Servidor corriendo : `)
    }
 })