const pool = require('../config/conection');
const tipoCovenios = {}

tipoCovenios.getTipoConvenios = async(req, res) => {
    try {
        const resultTipoConvenios = await pool.query('SELECT tp_cdgo, tp_desc FROM tipo_convenios WHERE tp_estado=1 ORDER BY tp_desc ASC') 
        if (resultTipoConvenios.length != 0) res.status(200).json({ status: true, data: resultTipoConvenios })
        else res.status(200).json({ status: false })
    } catch (error) {
        res.status(500).json({
            code: error.code,
            message: error.message
        })   
    }
}

module.exports = tipoCovenios