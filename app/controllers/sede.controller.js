const pool = require('../config/conection');
const  fs = require("fs");
const sedes = {}
const path = require('path');
const url_servidor = require('../config/url_services')
const { utilImage } = require('../utils/util')
const url_carpeta_logo = 'app/public/images_sedes/';
const url_carpeta_jersey = 'app/public/images_jersey_sedes/';

sedes.getSedes = async(req, res) => {
    try {
        const resultSedes = await pool.query('SELECT sd_cdgo, sd_desc, sd_logo FROM sede WHERE sd_estado=1 ORDER BY sd_cdgo DESC')
        if (resultSedes.length != 0) {            
            for (let i = 0; i < resultSedes.length; i++) {
                if (resultSedes[i].sd_logo) resultSedes[i].sd_logo = url_servidor+'sede/image/'+resultSedes[i].sd_logo
            }
            res.status(200).json({ status: true, data: resultSedes })           
        } else res.status(200).json({ status: false });
    } catch (error) {
        res.status(500).json({
            code: error.code,
            message: error.message
        })
    }    
}

sedes.getImage= async(req, res) =>{
    try {
        const sd_image = req.params.sd_logo
        fs.statSync(path.resolve(url_carpeta_logo + sd_image));
        res.sendFile(path.resolve(url_carpeta_logo + sd_image))
    } catch (error) {
        res.status(500).json({
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
        res.status(500).json({
            code: error.code
        })
    }
};

sedes.addSede= async(req, res)=>{
    try {
        const { sd_desc, sd_logo, sd_jersey, sd_ciudad_cd_cdgo } = req.body
        const nombre_imagen_logo = (sd_logo) ? await utilImage.guardarImagen(sd_desc, sd_logo, url_carpeta_logo) : null;
        const nombre_imagen_jersey = (sd_jersey) ? await utilImage.guardarImagen(sd_desc, sd_jersey, url_carpeta_jersey) : null;
        const datos={
            sd_desc: sd_desc,
            sd_logo: nombre_imagen_logo,
            sd_jersey: nombre_imagen_jersey,
            sd_ciudad_cd_cdgo: sd_ciudad_cd_cdgo
        }
        await pool.query('INSERT INTO sede SET ?', datos)
        res.status(200).json({ status: true});
    } catch (error) {
        res.status(500).json({
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
            res.status(200).json({ status: true, data: resultSede[0] })
        } else res.status(200).json({ status: false });        
    } catch (error) {
        res.status(500).json({
            code: error.code,
            message: error.message
        })
    }    
}

sedes.updateSede = async (req,res) => {
    try {
        let datos_actualizar = {};
        const { sd_cdgo } = req.params
        const { sd_desc, sd_logo, sd_url_logo, sd_jersey, sd_url_jersey, sd_ciudad_cd_cdgo } = req.body;
        datos_actualizar.sd_desc = sd_desc;
        datos_actualizar.sd_ciudad_cd_cdgo = sd_ciudad_cd_cdgo
        if (sd_logo) datos_actualizar.sd_logo = await utilImage.guardarImagen(sd_desc, sd_logo, url_carpeta_logo)
        if (sd_jersey) datos_actualizar.sd_jersey = await utilImage.guardarImagen(sd_desc, sd_jersey, url_carpeta_jersey)
        
        const updateSede = await pool.query('UPDATE sede SET ? WHERE sd_cdgo=?', [datos_actualizar, sd_cdgo])

        if (updateSede.affectedRows) {
            try {                
                if (sd_logo && sd_url_logo) fs.unlinkSync(url_carpeta_logo+sd_url_logo);
                if (sd_jersey && sd_url_jersey) fs.unlinkSync(url_carpeta_jersey+sd_url_jersey);
            } catch (error) { }
        } else {
            try {                
                if (sd_logo) fs.unlinkSync(url_carpeta_logo+datos_actualizar.sd_logo);
                if (sd_jersey) fs.unlinkSync(url_carpeta_jersey+datos_actualizar.sd_jersey);
            } catch (error) { }
            res.status(200).json({ status: false, message: 'Action denied'});
        }
        res.status(200).json({ status: true });

    } catch (error) {
        res.status(500).json({
            code: error.code,
            message: error.message
        })
    }
}

sedes.deleteSede = async (req, res) => {
    try {
        await pool.query('UPDATE sede SET ? WHERE sd_cdgo=?', [{sd_estado: 0}, req.params.sd_cdgo])
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({
            code: error.code,
            message: error.message
        })
    }
}

module.exports = sedes