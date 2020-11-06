
const app= require('./app/app')
require('./app/config/conection')
const port = process.env.port || 5000

app.listen(port, '0.0.0.0',(error)=>{
    if(error){
        console.log(`ha ocurrido un error: ${error}`)
    } else{
     console.log(`Servidor corriendo en puerto : `)
    }
 })