const pool = require('../config/conection');
const  fs = require("fs");
const sedes = {}
var path = require('path');
const url_servidor=require('./url_services')
const url_carpeta_logo='app/public/images_sedes/';
const url_carpeta_jersey='app/public/images_jersey_sedes/';

sedes.getSedes = async(req, res) => {
    try {
        const resultSedes = await pool.query('SELECT sd_cdgo AS id, sd_desc AS nombre, sd_logo AS url_logo,sd_jersey AS url_jersey FROM sede WHERE sd_estado=1')
        if (resultSedes != 0) {            
            for (let i = 0; i < resultSedes.length; i++) {
                if (resultSedes[i].url_logo) resultSedes[i].url_logo = url_servidor+'sede/image/'+resultSedes[i].url_logo
                if (resultSedes[i].url_jersey) resultSedes[i].url_jersey = url_servidor+'sede/imagejersey/'+resultSedes[i].url_jersey
            }
            res.json({ status: true, data: resultSedes })           
        } else res.json({ status: false });
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }    
}

sedes.getImage= async(req, res) =>{
    try {
        let sd_image = req.params.sd_logo
        fs.statSync(path.resolve(url_carpeta_logo + sd_image));
        res.sendFile(path.resolve(url_carpeta_logo + sd_image))
    } catch (error) {
        res.json({
            status: false,
            code: error.code
        })
    }
};

sedes.getImageJersey= async(req, res) =>{
    try {
        let sd_image = req.params.sd_logo
        fs.statSync(path.resolve(url_carpeta_jersey + sd_image));
        res.sendFile(path.resolve(url_carpeta_jersey + sd_image))
    } catch (error) {
        res.json({
            status: false,
            code: error.code
        })
    }
};

sedes.addSede= async(req, res)=>{
    console.log(req.body);
    try {
        const { nombre, logo, jersey, id_ciudad } = req.body
        const nombre_imagen_logo = (logo) ? await guardarImagen(nombre, logo, url_carpeta_logo) : null;
        const nombre_imagen_jersey = (jersey) ? await guardarImagen(nombre, jersey, url_carpeta_jersey) : null;
        const datos={
            sd_desc: nombre,
            sd_logo: nombre_imagen_logo,
            sd_jersey: nombre_imagen_jersey,
            sd_ciudad_cd_cdgo: id_ciudad
        }
        await pool.query('INSERT INTO sede SET ?', datos)
        res.json({ status: true});
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

// sede.getMesaSede=async(req,res)=>{
//     const sd_cdgo=req.params.sd_cdgo
//     const sd_mesa_trabajo=await pool.query('select us_nombres , ca_desc from usuario  join mesa_trabajo  on us_cdgo=mt_usuario_us_cdgo join cargo on ca_cdgo=mt_cargo_ca_cdgo where us_sede_sd_cdgo=?',sd_cdgo)
    
        

        
//     if (sd_mesa_trabajo.length != 0) res.json({ status: true, data: sd_mesa_trabajo })
//     else res.json({ status: false });
    
// }

// sede.searchSede= async(req,res)=> {
//     try {
//         const sd_cdgo=req.params.sd_cdgo
//         const sede=await pool.query('select sd_cdgo,sd_desc,sd_logo,sd_jersey,sd_estado, cd_cdgo, cd_desc from sede join ciudad on cd_cdgo=sd_ciudad_cd_cdgo where sd_cdgo=?',sd_cdgo);
//       if(sede.length!=0){

//         for(let i=0;i<sede.length;i++){
//             let url_image=url_servidor+'sede/image/'
//             let url_imageJersey=url_servidor+'sede/imagejersey/'
//              let sd_logo=sede[i]['sd_logo'];
//             let sd_jersey=sede[i]['sd_jersey'];
            

//             sede[i]['sd_logo']=url_image+sd_logo
//             sede[i]['sd_jersey']=url_imageJersey+sd_jersey

//         }
//         const data={
//             sd_cdgo:sede[0].sd_cdgo,
//             sd_desc:sede[0].sd_desc,
//             sd_logo:sede[0].sd_logo,
//             sd_jersey:sede[0].sd_jersey,
//             cd_desc:sede[0].cd_desc,
//             cd_cdgo:sede[0].cd_cdgo,
//             sd_estado:sede[0].sd_estado[0],
//             sd_mesa_trabajo:await pool.query('select us_nombres ,us_alias, ca_desc from usuario  join mesa_trabajo  on us_cdgo=mt_usuario_us_cdgo join cargo on ca_cdgo=mt_cargo_ca_cdgo where us_sede_sd_cdgo=?',sd_cdgo),
//         }
//         res.json({ status: true, data: data })
//       }
//         else res.status(200).json({ status: false });
        
//     } catch (err) {
//         res.status(500).json({error:err.code,
//         message:err.message});
        
//     }
    
// }


// sede.updateSede=async(req,res)=>{
//     const sd_cdgo=req.params.sd_cdgo
//     let sd_desc = req.body.sd_desc;
    
//     let sd_logo= req.body.sd_logo;
//     let sd_url_logo= req.body.sd_url_logo;
//     let sd_jersey = req.body.sd_jersey;
//     let sd_url_jersey = req.body.sd_url_jersey;
//     let sd_ciudad_cd_cdgo = req.body.sd_ciudad_cd_cdgo;
//     let datos_actualizar={};

//     if(sd_logo !='' && sd_jersey==''){
        
//         datos_actualizar={
//                 sd_desc:sd_desc,
//                 sd_logo: await guardarImagen(sd_desc,sd_logo,url_carpeta_logo),
//                 sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
//             }
//             await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
//                 if (err){
//                     fs.unlinkSync(url_carpeta_logo+datos_actualizar.sd_logo);
//                 } else{
//                     try {
//                         fs.unlinkSync(url_carpeta_logo+sd_url_logo);
//                         console.log('File removed')
//                       } catch(err) {
//                         console.error('Something wrong happened removing the file', err)
//                       }
//                       res.json({ status: true});
//                 }
                
//             },
//             )

            


//         console.log('cargo nuevo logo')


//     }else if(sd_jersey !='' && sd_logo==''){
//         datos_actualizar={
//             sd_desc:sd_desc,
//             sd_jersey: await guardarImagen(sd_desc,sd_jersey,url_carpeta_jersey),
//             sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
//         }
//         await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
//                 if (err){
//                     fs.unlinkSync(url_carpeta_jersey+datos_actualizar.sd_logo);
//                 } else{
//                     try {
//                         fs.unlinkSync(url_carpeta_jersey+sd_url_jersey);
//                         console.log('File removed')
//                       } catch(err) {
//                         console.error('Something wrong happened removing the file', err)
//                       }
//                       res.json({ status: true});
//                 }
                
//             })
//         console.log('cargo nuevo jersey')
//     }else if(sd_logo =='' && sd_jersey==''){
//         datos_actualizar={
//             sd_desc:sd_desc,
//             sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
//         }
//         await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
//             if (err){
                
//             } else{
//                 console.log('no se actualizo ninguna imagen')
//                   res.json({ status: true});
//             }
            
//         })
        
        
//     }else if(sd_logo !='' && sd_jersey!=''){
//         console.log('Se actualizaron las dos imagenes')
       

//         datos_actualizar={
//             sd_desc:sd_desc,
//             sd_logo: await guardarImagen(sd_desc,sd_logo,url_carpeta_logo),
//             sd_jersey: await guardarImagen(sd_desc,sd_jersey,url_carpeta_jersey),
//             sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
//         }

//         await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
//             if (err){
//                 fs.unlinkSync(url_carpeta_logo+datos_actualizar.sd_logo);
//                 fs.unlinkSync(url_carpeta_jersey+datos_actualizar.sd_jersey);
//             } else{
//                 try {
//                     fs.unlinkSync(url_carpeta_logo+sd_url_logo);
//                     console.log('File removed logo')
//                   } catch(err) {
//                     console.error('Something wrong happened removing the file logo', err)
//                   }

//                   try {
                    
//                     fs.unlinkSync(url_carpeta_jersey+sd_url_jersey);
//                     console.log('File removed jersey'+sd_url_jersey)
//                   } catch(err) {
//                     console.error('Something wrong happened removing the file jersey'+sd_url_jersey, err)
//                   }
//                   res.json({ status: true});
//             }
            
//         })
//     }

//     console.log(datos_actualizar);

//     res.status(200).json({ status: true });


// }


// function guardarImagen( sd_desc ,sd_imagen,url){
//     let nombre_sin_espacio=sd_desc.split(" ").join("")//quita los espacios al nombre
//     let date=new Date();
//     let ruta_imagen=url; //carpeta donde se guardara la logo
//     let nombre_imagen=date.getTime()+'_'+nombre_sin_espacio+'.png' // nombre de la logo, consta de un datatime y el nombre de la sede 
//     let data = sd_imagen.replace(/^data:image\/\w+;base64,/, '');// remueve valores innecesarios del data base64
//     let realFile = Buffer.from(data,"base64");// decodifica el base64 a una imagen
//     //almacena la logo en el servidor
//     fs.writeFile(ruta_imagen+nombre_imagen, realFile, function(err) {
//         if(err)
//            console.log(err);
//      });
    
//      return nombre_imagen;
// };


module.exports = sedes