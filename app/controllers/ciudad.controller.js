const pool = require('../config/conection');
const ciudad = {}

ciudad.getCiudad = async(req, res) => {
    try {
        const resultCiudades = await pool.query('SELECT cd_cdgo AS id, cd_desc as nombre FROM ciudad WHERE cd_estado=1 ORDER BY cd_desc ASC') 
        if (resultCiudades.length != 0) res.json({ status: true, data: resultCiudades })
        else res.json({ status: false })
    } catch (error) {
        res.json({
            status: false,
            code: error.code,
            message: error.message
        })   
    }
}  

/* ciudad.addCiudad= async(req,res)=> {
    const {cd_desc,cd_cdgo}=req.body
    const datos={
        cd_cdgo:cd_cdgo,
        cd_desc:cd_desc,
        
        cd_estado:"true"
    }
    pool.query('insert into ciudad set ?',datos , (err) => {
        if (err) throw err;
        res.json({ status: true });
    });
} */

module.exports = ciudad