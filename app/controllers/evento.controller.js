const pool = require('../config/conection');
const  fs = require("fs");
const evento = {}
var path = require('path');
const url_servidor='https://colombiaenduro.herokuapp.com/'
const { json } = require('express');


// replace(/T/, ' ').replace(/\..+/, '')


evento.getEvento = async(req,res) => {
    pool.query(' SELECT ev_cdgo,ev_sede_sd_cdgo,ev_usuario_us_cdgo,DATE_FORMAT(ev_fecha_inicio,"%d/%M/%y") as ev_fecha_inicio, DATE_FORMAT(ev_fecha_fin,"%d/%M/%y") as ev_fecha_fin,ev_desc,ev_lugar,ev_img,us_nombres,sd_desc,datediff(ev_fecha_inicio,now())as ev_faltante from evento join usuario on ev_usuario_us_cdgo=us_cdgo join sede on sd_cdgo=us_sede_sd_cdgo where ev_estado=1', (err, resul) => {
        let url_image=url_servidor+'evento/image/'

        for(let i=0;i<resul.length;i++){
            
            let ev_img=resul[i]['ev_img'];
            

            resul[i]['ev_img']=url_image+ev_img

        }
        if (err) throw err;
        
        else if (resul.length != 0) res.json({ status: true, data: resul })
        else res.json({ status: false });
    })

    
}

evento.getImage= async(req, res) =>{
    var ev_img=req.params.ev_img

    res.sendFile(path.resolve(path.resolve('images_eventos/'+ev_img)))
};

evento.addEvento= async(req, res)=>{
    let us_sede_sd_cdgo=req.body.us_sede_sd_cdgo
    let us_cdgo=req.body.us_cdgo;
    let ev_desc=req.body.ev_desc;
    let ev_fecha_inicio=req.body.ev_fecha_inicio;
    let ev_fecha_fin=req.body.ev_fecha_fin;
    let ev_lugar=req.body.ev_lugar;
    let ev_img=req.body.ev_img;
    console.log(ev_desc);
    let url_carpeta_logo='images_eventos/';
    let nombre_imagen_logo = guardarImagen(ev_desc,ev_img,url_carpeta_logo);
    const datos={
        ev_sede_sd_cdgo:us_sede_sd_cdgo,
        ev_usuario_us_cdgo:us_cdgo,
        ev_desc:ev_desc,
        ev_fecha_inicio:ev_fecha_inicio,
        ev_fecha_fin:ev_fecha_fin,
        ev_lugar:ev_lugar,
        ev_img:nombre_imagen_logo
    }

    await pool.query('insert into evento set ?',datos , (err,resul) => {
        if (err){
            
            fs.unlinkSync(url_carpeta_logo+nombre_imagen_logo);
            console.log(err);
            return err
        } else{
             return  res.json({ status: true});
        }
    }
    )
}
    

    
    function guardarImagen( sd_desc ,sd_imagen,url){
        let nombre_sin_espacio=sd_desc.split(" ").join("")//quita los espacios al nombre
        let date=new Date();
        let ruta_imagen=url; //carpeta donde se guardara la logo
        let nombre_imagen=date.getTime()+'_'+nombre_sin_espacio+'.png' // nombre de la logo, consta de un datatime y el nombre de la sede 
        let data = sd_imagen.replace(/^data:image\/\w+;base64,/, '');// remueve valores innecesarios del data base64
        let realFile = Buffer.from(data,"base64");// decodifica el base64 a una imagen
        //almacena la logo en el servidor
        fs.writeFile(ruta_imagen+nombre_imagen, realFile, function(err) {
            if(err)
               console.log(err);
         });
        
         return nombre_imagen;
    };


module.exports=evento;