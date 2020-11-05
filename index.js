


const app= require('./app/app')
require('./app/config/conection')

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log(`ha ocurrido un error: ${error}`)
    } else{
     console.log(`Servidor corriendo en puerto : ${app.get('port')}`)
    }
 })