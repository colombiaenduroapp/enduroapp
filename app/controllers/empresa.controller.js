const pool = require('../config/conection');
const fs = require("fs");
const empresa = {}

var path = require('path')
const url_servidor = require('./url_services')
const url_carpeta_logo = 'images_empresas/';
const { json } = require('express');
const prueba = require('./url_services');


// replace(/T/, ' ').replace(/\..+/, '')


empresa.getEmpresa = async(req, res) => {
    pool.query(' SELECT em_cdgo,em_nit,em_logo,em_nombre,em_desc,em_telefono,em_correo,em_estado from empresa', (err, resul) => {
        let url_image = url_servidor + 'empresa/image/'

        for (let i = 0; i < resul.length; i++) {

            let ev_img = resul[i]['em_logo'];
            if (ev_img != null) {

                resul[i]['em_logo'] = url_image + ev_img
            }

        }
        if (err) throw err;

        else if (resul.length != 0) res.json({ status: true, data: resul })
        else res.json({ status: false });
    })


}

empresa.getImage = async(req, res) => {
    var em_img = req.params.em_img

    res.sendFile(path.resolve(path.resolve(url_carpeta_logo + em_img)))
};

empresa.addEmpresa = async(req, res) => {
    let em_nit = req.body.em_nit
    let em_logo = req.body.em_logo;
    let em_nombre = req.body.em_nombre;
    let em_desc = req.body.em_desc;
    let em_telefono = req.body.em_telefono;
    let em_correo = req.body.em_correo;
    let nombre_imagen_logo = '';
    if (em_logo != null) {
        nombre_imagen_logo = guardarImagen(em_nombre, em_logo, url_carpeta_logo);
    }
    const datos = {
        em_nit: em_nit,
        em_logo: nombre_imagen_logo,
        em_nombre: em_nombre,
        em_desc: em_desc,
        em_telefono: em_telefono,
        em_correo: em_correo,

    }

    await pool.query('insert into empresa set ?', datos, (err, resul) => {
        if (err) {

            fs.unlinkSync(url_carpeta_logo + nombre_imagen_logo);
            console.log(err);
            return err
        } else {
            return res.json({ status: true });
        }
    })
}

// evento.updateEvento=async(req,res)=>{
//     const ev_cdgo=req.params.ev_cdgo
//     const url_carpeta_logo='images_empresas/'
//     let us_sede_sd_cdgo=req.body.us_sede_sd_cdgo
//     let us_cdgo=req.body.us_cdgo;
//     let ev_desc=req.body.ev_desc;
//     let ev_fecha_inicio=req.body.ev_fecha_inicio;
//     let ev_fecha_fin=req.body.ev_fecha_fin;
//     let ev_lugar=req.body.ev_lugar;
//     let ev_img=req.body.ev_img;
//     let ev_url_img=req.body.ev_url_img;
//     let ev_url_video=req.body.ev_url_video;
//     let datos_actualizar={};


//     if(ev_img !=''){

//         datos_actualizar={
//             ev_sede_sd_cdgo:us_sede_sd_cdgo,
//             ev_usuario_us_cdgo:us_cdgo,
//             ev_desc:ev_desc,
//             ev_fecha_inicio:ev_fecha_inicio,
//             ev_fecha_fin:ev_fecha_fin,
//             ev_lugar:ev_lugar,
//             ev_img:await guardarImagen(ev_desc,ev_img,url_carpeta_logo),
//             ev_url_video:ev_url_video,
//             }
//             await pool.query('update evento set ? where ev_cdgo=?',[datos_actualizar,ev_cdgo] , (err,resul) => {
//                 if (err){
//                     try {
//                         fs.unlinkSync(url_carpeta_logo+datos_actualizar.ev_img);
//                         console.log('File removed')
//                       } catch(err) {
//                         console.error('Something wrong happened removing the file', err)
//                       }

//                     console.log(err);
//                 } else{
//                     try {
//                         fs.unlinkSync(url_carpeta_logo+ev_url_img);
//                         console.log('File removed')
//                       } catch(err) {
//                         console.error('Something wrong happened removing the file', err)
//                       }
//                       res.json({ status: true});
//                 }

//             },
//             )

//     }else{
//         datos_actualizar={
//             ev_sede_sd_cdgo:us_sede_sd_cdgo,
//             ev_usuario_us_cdgo:us_cdgo,

//             ev_fecha_inicio:ev_fecha_inicio,
//             ev_fecha_fin:ev_fecha_fin,
//             ev_desc:ev_desc,
//             ev_lugar:ev_lugar,

//             // ev_url_video:ev_url_video,
//             }

//         await pool.query('update evento set ? where ev_cdgo=?',[datos_actualizar,ev_cdgo] , (err,resul) => {
//             if (err){
//                 console.log(err);

//             } else{
//                 console.log('success');
//                   res.json({ status: true});
//             }

//         })


//     }


//     res.status(200).json({ status: true });

// }


empresa.searchEmpresa = async(req, res) => {
    let em_cdgo = req.params.em_cdgo
    try {
        const empresa = await pool.query('SELECT em_cdgo,em_nit,em_logo,em_nombre,em_desc,em_telefono,em_correo,em_estado from empresa where em_cdgo=?', em_cdgo)
        let url_image = url_servidor + 'empresa/image/'

        for (let i = 0; i < empresa.length; i++) {

            let ev_img = empresa[i]['em_logo'];


            empresa[i]['em_logo'] = url_image + ev_img

        }

        let data = {
            em_cdgo: empresa[0].em_cdgo,
            em_nit: empresa[0].em_nit,
            em_logo: empresa[0].em_logo,
            em_nombre: empresa[0].em_nombre,
            em_desc: empresa[0].em_desc,
            em_telefono: empresa[0].em_telefono,
            em_correo: empresa[0].em_correo,
            em_estado: empresa[0].em_estado,
        }


        if (empresa.length != 0) res.json({ status: true, data: data })
        else res.json({ status: false });
    } catch (err) {
        return err;
    }



}




function guardarImagen(sd_desc, sd_imagen, url) {
    let nombre_sin_espacio = sd_desc.split(" ").join("") //quita los espacios al nombre
    let date = new Date();
    let ruta_imagen = url; //carpeta donde se guardara la logo
    let nombre_imagen = date.getTime() + '_' + nombre_sin_espacio + '.png' // nombre de la logo, consta de un datatime y el nombre de la sede 
    let data = sd_imagen.replace(/^data:image\/\w+;base64,/, ''); // remueve valores innecesarios del data base64
    let realFile = Buffer.from(data, "base64"); // decodifica el base64 a una imagen
    //almacena la logo en el servidor
    fs.writeFile(ruta_imagen + nombre_imagen, realFile, function(err) {
        if (err)
            console.log(err);
    });

    return nombre_imagen;
};


module.exports = empresa;