const pool = require('../config/conection');
const convenios = {}

/* sedes.getSedes = async(req, res) => {
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
} */



/* sedes.updateSede = async (req,res) => {
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
 */
module.exports = convenios