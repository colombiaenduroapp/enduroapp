const pool = require('../config/conection');
const fs = require("fs");
const empresas = {}
const path = require('path')
const url_servidor = require('../config/url_services')
const { utilImage } = require('../utils/util')
const url_carpeta_logo = 'app/public/images_empresas/';

empresas.getEmpresas = async (req, res) => {
    try {
        const resultEmpresas = await pool.query('SELECT em_cdgo, em_nit, em_logo, em_nombre, em_desc,em_telefono, em_correo FROM empresa WHERE em_estado=1 ORDER BY em_cdgo DESC')
        if (resultEmpresas.length != 0) {
            for (let i = 0; i < resultEmpresas.length; i++) {
                if (resultEmpresas[i].em_logo) resultEmpresas[i].em_logo = url_servidor+'empresa/image/'+resultEmpresas[i].em_logo
            }
            res.json({ status: true, data: resultEmpresas })
        } else res.json({ status: false });        
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

empresas.getImage = async(req, res) => {
    try {
        const { em_img } = req.params
        fs.statSync(path.resolve(url_carpeta_logo + em_img));
        res.sendFile(path.resolve(url_carpeta_logo + em_img))
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
        })
    }
};

empresas.addEmpresa = async(req, res) => {
    try {
        const { em_nit, em_logo, em_nombre, em_desc, em_telefono, em_correo } = req.body
        const datos = {
            em_nit: em_nit,
            em_logo: (em_logo) ? await utilImage.guardarImagen(em_nombre, em_logo, url_carpeta_logo): null,
            em_nombre: em_nombre,
            em_desc: em_desc,
            em_telefono: em_telefono,
            em_correo: em_correo,
        }
        await pool.query('INSERT INTO empresa SET ?', datos)
        res.json({ status: true });
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })  
    }
}

empresas.searchEmpresa = async(req, res) => {
    try {        
        const { em_cdgo } = req.params
        const resultEmpresa = await pool.query('SELECT em_cdgo, em_nit, em_logo, em_nombre, em_desc,em_telefono, em_correo FROM empresa WHERE em_cdgo=? AND em_estado=1 LIMIT 1', em_cdgo)
        if (resultEmpresa.length != 0) {
            if (resultEmpresa[0].em_logo) resultEmpresa[0].em_logo = url_servidor+'empresa/image/'+resultEmpresa[0].em_logo
            res.json({ status: true, data: resultEmpresa[0] })
        } else res.json({ status: false });
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

empresas.updateEmpresa = async(req, res) => {
    try {
        let datos_actualizar = {};
        const { em_cdgo } = req.params        
        const { em_nit, em_logo, em_url_logo, em_nombre, em_desc, em_telefono, em_correo } = req.body
        datos_actualizar.em_nit = em_nit;
        datos_actualizar.em_nombre = em_nombre
        datos_actualizar.em_desc = em_desc
        datos_actualizar.em_telefono = em_telefono
        datos_actualizar.em_correo = em_correo
        
        if (em_logo) datos_actualizar.em_logo = await utilImage.guardarImagen(em_nombre, em_logo, url_carpeta_logo)
        
        const updateEmpresa = await pool.query('UPDATE empresa SET ? WHERE em_cdgo=?', [datos_actualizar, em_cdgo])

        if (updateEmpresa.affectedRows) {
            try {                
                if (em_logo && em_url_logo) fs.unlinkSync(url_carpeta_logo+em_url_logo);
            } catch (error) { }
        } else {
            try {                
                if (em_logo) fs.unlinkSync(url_carpeta_logo+datos_actualizar.em_logo);
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

empresas.deleteEmpresa = async (req, res) => {
    try {
        await pool.query('UPDATE empresa SET ? WHERE em_cdgo=?', [{em_estado: 0}, req.params.em_cdgo])
        res.json({ status: true })
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })
    }
}

module.exports = empresas;