
const pool = require('../config/conection');
const  fs = require("fs");

const ciudad = {}

ciudad.getCiudad = async(req, res) => {
    pool.query('SELECT * from ciudad', (err, resul) => {
        if (err) throw err;
        else if (resul.length != 0) res.json({ status: true, data: resul })
        else res.json({ status: false });
    })
}


// async function getOneCiudad(req,res) {
//     const {cd_cdgo}=req.params
//     try{
//         let sql=`select * from ciudad where cd_cdgo=${connection.escape(cd_cdgo)}`
//         const rows= await query(sql)
//         res.json(rows)
//     }catch{
//         console.error('haocurrido un error');
//     }
// }

ciudad.addImage= async(req, res)=>{
    var name = req.body.name;
    console.log(name)
    var img = req.body.image;
    var realFile = Buffer.from(img,"base64");
    fs.writeFileSync('images_sedes/'+name, realFile,'utf8');

    await res.send("OK");
     
   }
  

ciudad.addCiudad= async(req,res)=> {
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
}


// async function editCiudad(req,res) {
//     const {cd_cdgo}=req.params
//     const {cd_desc}=req.body
//     try{
//         let sql=`UPDATE ciudad SET cd_desc=${connection.escape(cd_desc)} WHERE cd_cdgo=${connection.escape(cd_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Actualizado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }

// async function deleteCiudad(req,res) {
//     const {cd_cdgo}=req.params
//     try{
//         let sql=`UPDATE ciudad SET cd_estado="false" WHERE cd_cdgo=${connection.escape(cd_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Eliminado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


module.exports = ciudad