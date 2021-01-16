const pool = require('../config/conection');
const  fs = require("fs");
const sedes = {}
var path = require('path');
const url_servidor=require('./url_services')
const url_carpeta_logo='app/public/images_sedes/';
const url_carpeta_jersey='app/public/images_jersey_sedes/';

sedes.getSedes = async(req, res) => {
    try {
        const resultSedes = await pool.query('SELECT sd_cdgo, sd_desc, sd_logo, sd_jersey FROM sede WHERE sd_estado=1 ORDER BY sd_cdgo DESC')
        if (resultSedes != 0) {            
            for (let i = 0; i < resultSedes.length; i++) {
                if (resultSedes[i].sd_logo) resultSedes[i].sd_logo = url_servidor+'sede/image/'+resultSedes[i].sd_logo
                if (resultSedes[i].sd_jersey) resultSedes[i].sd_jersey = url_servidor+'sede/imagejersey/'+resultSedes[i].sd_jersey
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
    try {
        const { sd_desc, sd_logo, sd_jersey, sd_ciudad_cd_cdgo } = req.body
        const nombre_imagen_logo = (sd_logo) ? await guardarImagen(sd_desc, sd_logo, url_carpeta_logo) : null;
        const nombre_imagen_jersey = (sd_jersey) ? await guardarImagen(sd_desc, sd_jersey, url_carpeta_jersey) : null;
        const datos={
            sd_desc: sd_desc,
            sd_logo: nombre_imagen_logo,
            sd_jersey: nombre_imagen_jersey,
            sd_ciudad_cd_cdgo: sd_ciudad_cd_cdgo
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

sedes.searchSede= async(req,res) => {
    try {
        const { sd_cdgo } = req.params
        const resultSede = await pool.query('SELECT sd_cdgo, sd_desc, sd_logo, sd_jersey, cd_cdgo, cd_desc FROM sede JOIN ciudad ON cd_cdgo=sd_ciudad_cd_cdgo WHERE sd_cdgo=? AND sd_estado=1 LIMIT 1',sd_cdgo);
        if(resultSede.length != 0){
            if (resultSede[0].sd_logo) resultSede[0].sd_logo = url_servidor+'sede/image/'+resultSede[0].sd_logo
            if (resultSede[0].sd_jersey) resultSede[0].sd_jersey = url_servidor+'sede/imagejersey/'+resultSede[0].sd_jersey
            resultSede[0].sd_mesa_trabajo = await pool.query('SELECT us_nombres ,us_alias, ca_desc FROM usuario JOIN mesa_trabajo ON us_cdgo=mt_usuario_us_cdgo JOIN cargo ON ca_cdgo=mt_cargo_ca_cdgo WHERE us_sede_sd_cdgo=? AND us_estado=1 AND mt_estado=1',sd_cdgo)
            res.json({ status: true, data: resultSede[0] })
        } else res.json({ status: false });        
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }    
}

sedes.updateSede=async(req,res)=>{
    try {
        const { sd_cdgo } = req.params
        const { sd_desc, sd_logo, sd_url_logo, sd_jersey, sd_url_jersey, sd_ciudad_cd_cdgo } = req.body;
        let datos_actualizar={};
        if(sd_logo!='' && sd_jersey===''){
            datos_actualizar = {
                sd_desc: sd_desc,
                sd_logo: await guardarImagen(sd_desc, sd_logo, url_carpeta_logo),
                sd_ciudad_cd_cdgo: sd_ciudad_cd_cdgo
            }
            await pool.query('UPDATE sede SET ? WHERE sd_cdgo=?', [datos_actualizar, sd_cdgo] , (err,resul) => {
                if (err){
                    fs.unlinkSync(url_carpeta_logo+datos_actualizar.sd_logo);
                } else {
                    try {
                        fs.unlinkSync(url_carpeta_logo+sd_url_logo);
                        console.log('File removed')
                    } catch(err) {
                        console.error('Something wrong happened removing the file', err)
                    }
                    res.json({ status: true});
                }
            })
        } else if(sd_jersey !='' && sd_logo==''){
            datos_actualizar={
                sd_desc:sd_desc,
                sd_jersey: await guardarImagen(sd_desc,sd_jersey,url_carpeta_jersey),
                sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
            }
            await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
                    if (err){
                        fs.unlinkSync(url_carpeta_jersey+datos_actualizar.sd_logo);
                    } else{
                        try {
                            fs.unlinkSync(url_carpeta_jersey+sd_url_jersey);
                            console.log('File removed')
                          } catch(err) {
                            console.error('Something wrong happened removing the file', err)
                          }
                          res.json({ status: true});
                    }
                    
                })
            console.log('cargo nuevo jersey')
        }else if(sd_logo =='' && sd_jersey==''){
            datos_actualizar={
                sd_desc:sd_desc,
                sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
            }
            await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
                if (err){
                    
                } else{
                    console.log('no se actualizo ninguna imagen')
                      res.json({ status: true});
                }
                
            })
            
            
        }else if(sd_logo !='' && sd_jersey!=''){
            console.log('Se actualizaron las dos imagenes')
           
    
            datos_actualizar={
                sd_desc:sd_desc,
                sd_logo: await guardarImagen(sd_desc,sd_logo,url_carpeta_logo),
                sd_jersey: await guardarImagen(sd_desc,sd_jersey,url_carpeta_jersey),
                sd_ciudad_cd_cdgo:sd_ciudad_cd_cdgo
            }
    
            await pool.query('update sede set ? where sd_cdgo=?',[datos_actualizar,sd_cdgo] , (err,resul) => {
                if (err){
                    fs.unlinkSync(url_carpeta_logo+datos_actualizar.sd_logo);
                    fs.unlinkSync(url_carpeta_jersey+datos_actualizar.sd_jersey);
                } else{
                    try {
                        fs.unlinkSync(url_carpeta_logo+sd_url_logo);
                        console.log('File removed logo')
                      } catch(err) {
                        console.error('Something wrong happened removing the file logo', err)
                      }
    
                      try {
                        
                        fs.unlinkSync(url_carpeta_jersey+sd_url_jersey);
                        console.log('File removed jersey'+sd_url_jersey)
                      } catch(err) {
                        console.error('Something wrong happened removing the file jersey'+sd_url_jersey, err)
                      }
                      res.json({ status: true});
                }
                
            })
        }
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
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

module.exports = sedes