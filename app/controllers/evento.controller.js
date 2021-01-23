const pool = require('../config/conection');
const fs = require("fs");
const eventos = {}
const path = require('path')
const url_servidor = require('./url_services')
const url_carpeta_logo='app/public/images_eventos/'

eventos.getEventos = async(req, res) => {
    try {
        const resultEventos = await pool.query('SELECT ev_cdgo, DATE_FORMAT(ev_fecha_inicio,"%d/%M/%y") AS ev_fecha_inicio, DATE_FORMAT(ev_fecha_fin,"%d/%M/%y") AS ev_fecha_fin, ev_desc, ev_img, sd_desc, IF(DATEDIFF(ev_fecha_inicio,now())>0,1,IF(DATEDIFF(ev_fecha_fin,now())<0,2,0)) AS ev_estado_ev FROM evento JOIN usuario ON ev_usuario_us_cdgo=us_cdgo JOIN sede ON sd_cdgo=us_sede_sd_cdgo WHERE ev_estado=1 ORDER BY ev_estado_ev ASC')
        if (resultEventos.length != 0) {
            for (let i = 0; i < resultEventos.length; i++) {
                if (resultEventos[i].ev_img) resultEventos[i].ev_img = url_servidor+'evento/image/'+resultEventos[i].ev_img
            }
            res.json({ status: true, data: resultEventos })
        } else  res.json({ status: false });
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

eventos.getImage = async(req, res) => {
    try {
        const { ev_img } = req.params
        fs.statSync(path.resolve(url_carpeta_logo + ev_img));
        res.sendFile(path.resolve(url_carpeta_logo + ev_img))
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
        })
    }
};

eventos.addEvento = async(req, res) => {
    try {
        const { us_sede_sd_cdgo, us_cdgo, ev_desc, ev_fecha_inicio, ev_fecha_fin, ev_lugar, ev_img, ev_url_video, } = req.body
        const datos = {
            ev_sede_sd_cdgo: us_sede_sd_cdgo,
            ev_usuario_us_cdgo: us_cdgo,
            ev_desc: ev_desc,
            ev_fecha_inicio: ev_fecha_inicio,
            ev_fecha_fin: ev_fecha_fin,
            ev_lugar: ev_lugar,
            ev_img: await guardarImagen(ev_desc, ev_img, url_carpeta_logo),
            ev_url_video: ev_url_video
        }
        await pool.query('insert into evento set ?', datos)
        res.json({ status: true });
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

eventos.updateEvento = async(req, res) => {
    try {
        let datos_actualizar = {};
        const { ev_cdgo } = req.params
        const { us_sede_sd_cdgo, us_cdgo, ev_desc, ev_fecha_inicio, ev_fecha_fin, ev_lugar, ev_img, ev_url_img, ev_url_video } = req.body
        datos_actualizar.ev_sede_sd_cdgo =  us_sede_sd_cdgo
        datos_actualizar.ev_usuario_us_cdgo =  us_cdgo
        datos_actualizar.ev_desc = ev_desc
        datos_actualizar.ev_fecha_inicio = ev_fecha_inicio
        datos_actualizar.ev_fecha_fin = ev_fecha_fin
        datos_actualizar.ev_lugar = ev_lugar
        datos_actualizar.ev_url_video = ev_url_video
        if (ev_img) datos_actualizar.ev_img = await guardarImagen(ev_desc, ev_img, url_carpeta_logo)
        
        const updateEvento = await pool.query('UPDATE evento SET ? WHERE ev_cdgo=?', [datos_actualizar, ev_cdgo])

        if (updateEvento.affectedRows) {
            try {                
                if (ev_img && ev_url_img) fs.unlinkSync(url_carpeta_logo+ev_url_img);
            } catch (error) { }
        } else {
            try {                
                if (ev_img) fs.unlinkSync(url_carpeta_logo+datos_actualizar.ev_img);
            } catch (error) { }
            res.json({ status: false, message: 'Action denied'});
        }
        res.json({ status: true });

    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

eventos.searchEvento = async(req, res) => {
    try {
        const { ev_cdgo } = req.params
        const resultEvento = await pool.query(' SELECT ev_cdgo, ev_sede_sd_cdgo, ev_usuario_us_cdgo, DATE_FORMAT(ev_fecha_inicio,"%d/%M/%y") as ev_fecha_inicio, DATE_FORMAT(ev_fecha_fin,"%d/%M/%y") as ev_fecha_fin, ev_desc, ev_lugar, ev_img, us_nombres, sd_desc, datediff(ev_fecha_inicio,now()) AS ev_faltante, ev_url_video from evento join usuario on ev_usuario_us_cdgo=us_cdgo join sede on sd_cdgo=us_sede_sd_cdgo where ev_cdgo=? AND ev_estado=1 LIMIT 1', ev_cdgo)
        
        if (resultEvento.length != 0) {
            if (resultEvento[0].ev_img) resultEvento[0].ev_img = url_servidor+'evento/image/'+resultEvento[0].ev_img
            res.json({ status: true, data: resultEvento[0] })
        } else res.json({ status: false })
        
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

const guardarImagen = async(sd_desc, sd_imagen, ruta_imagen) => {
    let nombre_sin_espacio = sd_desc.split(" ").join("") //quita los espacios al nombre
    let date = new Date();
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
 
module.exports = eventos;