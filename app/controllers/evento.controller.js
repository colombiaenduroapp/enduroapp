const pool = require('../config/conection');
const fs = require("fs");
const eventos = {}
const path = require('path')
const url_servidor = require('./url_services')
const url_carpeta_logo='app/public/images_eventos/'

eventos.getEventos = async(req, res) => {
    pool.query('SELECT ev_cdgo, ev_sede_sd_cdgo, ev_usuario_us_cdgo, DATE_FORMAT(ev_fecha_inicio,"%d/%M/%y") AS ev_fecha_inicio, DATE_FORMAT(ev_fecha_fin,"%d/%M/%y") AS ev_fecha_fin, ev_desc,ev_lugar, ev_img, us_nombres, sd_desc, DATEDIFF(ev_fecha_inicio,now()) AS ev_faltante, ev_url_video FROM evento JOIN usuario ON ev_usuario_us_cdgo=us_cdgo JOIN sede ON sd_cdgo=us_sede_sd_cdgo WHERE ev_estado=1 AND DATEDIFF(ev_fecha_inicio,now())>=0', (err, resul) => {
        let url_image = url_servidor + 'evento/image/'

        for (let i = 0; i < resul.length; i++) {

            let ev_img = resul[i]['ev_img'];


            resul[i]['ev_img'] = url_image + ev_img

        }
        if (err) throw err;

        else if (resul.length != 0) res.json({ status: true, data: resul })
        else res.json({ status: false });
    })


}

eventos.getImage = async(req, res) => {
    var ev_img = req.params.ev_img

    res.sendFile(path.resolve(path.resolve(url_carpeta_logo + ev_img)))
};

/* evento.addEvento = async(req, res) => {
    let us_sede_sd_cdgo = req.body.us_sede_sd_cdgo
    let us_cdgo = req.body.us_cdgo;
    let ev_desc = req.body.ev_desc;
    let ev_fecha_inicio = req.body.ev_fecha_inicio;
    let ev_fecha_fin = req.body.ev_fecha_fin;
    let ev_lugar = req.body.ev_lugar;
    let ev_img = req.body.ev_img;
    let ev_url_video = req.body.ev_url_video;
    let nombre_imagen_logo = guardarImagen(ev_desc, ev_img, url_carpeta_logo);
    const datos = {
        ev_sede_sd_cdgo: us_sede_sd_cdgo,
        ev_usuario_us_cdgo: us_cdgo,
        ev_desc: ev_desc,
        ev_fecha_inicio: ev_fecha_inicio,
        ev_fecha_fin: ev_fecha_fin,
        ev_lugar: ev_lugar,
        ev_img: nombre_imagen_logo,
        ev_url_video: ev_url_video

    }

    await pool.query('insert into evento set ?', datos, (err, resul) => {
        if (err) {

            fs.unlinkSync(url_carpeta_logo + nombre_imagen_logo);
            console.log(err);
            return err
        } else {
            return res.json({ status: true });
        }
    })
}

evento.updateEvento = async(req, res) => {
    const ev_cdgo = req.params.ev_cdgo
    let us_sede_sd_cdgo = req.body.us_sede_sd_cdgo
    let us_cdgo = req.body.us_cdgo;
    let ev_desc = req.body.ev_desc;
    let ev_fecha_inicio = req.body.ev_fecha_inicio;
    let ev_fecha_fin = req.body.ev_fecha_fin;
    let ev_lugar = req.body.ev_lugar;
    let ev_img = req.body.ev_img;
    let ev_url_img = req.body.ev_url_img;
    let ev_url_video = req.body.ev_url_video;
    let datos_actualizar = {};


    if (ev_img != '') {

        datos_actualizar = {
            ev_sede_sd_cdgo: us_sede_sd_cdgo,
            ev_usuario_us_cdgo: us_cdgo,
            ev_desc: ev_desc,
            ev_fecha_inicio: ev_fecha_inicio,
            ev_fecha_fin: ev_fecha_fin,
            ev_lugar: ev_lugar,
            ev_img: await guardarImagen(ev_desc, ev_img, url_carpeta_logo),
            ev_url_video: ev_url_video,
        }
        await pool.query('update evento set ? where ev_cdgo=?', [datos_actualizar, ev_cdgo], (err, resul) => {
            if (err) {
                try {
                    fs.unlinkSync(url_carpeta_logo + datos_actualizar.ev_img);
                    console.log('File removed')
                } catch (err) {
                    console.error('Something wrong happened removing the file', err)
                }

                console.log(err);
            } else {
                try {
                    fs.unlinkSync(url_carpeta_logo + ev_url_img);
                    console.log('File removed')
                } catch (err) {
                    console.error('Something wrong happened removing the file', err)
                }
                res.json({ status: true });
            }

        }, )

    } else {
        datos_actualizar = {
            ev_sede_sd_cdgo: us_sede_sd_cdgo,
            ev_usuario_us_cdgo: us_cdgo,

            ev_fecha_inicio: ev_fecha_inicio,
            ev_fecha_fin: ev_fecha_fin,
            ev_desc: ev_desc,
            ev_lugar: ev_lugar,

            // ev_url_video:ev_url_video,
        }

        await pool.query('update evento set ? where ev_cdgo=?', [datos_actualizar, ev_cdgo], (err, resul) => {
            if (err) {
                console.log(err);

            } else {
                console.log('success');
                res.json({ status: true });
            }

        })


    }


    res.status(200).json({ status: true });

}

evento.searchEvento = async(req, res) => {
    let ev_cdgo = req.params.ev_cdgo
    try {
        const evento = await pool.query(' SELECT ev_cdgo,ev_sede_sd_cdgo,ev_usuario_us_cdgo,DATE_FORMAT(ev_fecha_inicio,"%d/%M/%y") as ev_fecha_inicio, DATE_FORMAT(ev_fecha_fin,"%d/%M/%y") as ev_fecha_fin,ev_desc,ev_lugar,ev_img,us_nombres,sd_desc,datediff(ev_fecha_inicio,now())as ev_faltante, ev_url_video from evento join usuario on ev_usuario_us_cdgo=us_cdgo join sede on sd_cdgo=us_sede_sd_cdgo where ev_cdgo=?', ev_cdgo)
        let url_image = url_servidor + 'evento/image/'

        for (let i = 0; i < evento.length; i++) {

            let ev_img = evento[i]['ev_img'];


            evento[i]['ev_img'] = url_image + ev_img

        }

        let data = {
            ev_cdgo: evento[0].ev_cdgo,
            ev_sede_sd_cdgo: evento[0].ev_sede_sd_cdgo,
            ev_usuario_us_cdgo: evento[0].ev_usuario_us_cdgo,
            ev_fecha_inicio: evento[0].ev_fecha_inicio,
            ev_fecha_fin: evento[0].ev_fecha_fin,
            ev_desc: evento[0].ev_desc,
            ev_lugar: evento[0].ev_lugar,
            ev_img: evento[0].ev_img,
            us_nombres: evento[0].us_nombres,
            ev_faltante: evento[0].ev_faltante,
            ev_url_video: evento[0].ev_url_video
        }


        if (evento.length != 0) res.json({ status: true, data: data })
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
 */
module.exports = eventos;