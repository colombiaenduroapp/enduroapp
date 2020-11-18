// 'use strict'
 

// const util=require('util')
// const connection= require('../config/conection')
// const query=util.promisify(connection.query).bind(connection)

// async function getSede(req,res) {
//     let sql=`select * from sede where sd_estad="true"`
//     const rows= await query(sql)
//     res.json(rows)
// }

// async function getOneSede(req,res) {
//     const {sd_cdgo}=req.params
//     try{
//         let sql=`select * from sede where sd_cdgo=${connection.escape(sd_cdgo)}`
//         const rows= await query(sql)
//         res.json(rows)
//     }catch{
//         console.error('haocurrido un error');
//     }
// }


// async function addSede(req,res) {
//     const {sd_desc,sd_ciudad_cd_cdgo}=req.body
//     try{
//         console.log("a");
//         console.log(sd_desc);
//         let sql=`insert into sede(sd_desc,sd_estad,sd_ciudad_cd_cdgo) values(${connection.escape(sd_desc)},"true",${connection.escape(sd_ciudad_cd_cdgo)})`
//         const rows= await query(sql)
//         res.json({message:`${sd_desc} registrado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// async function editSede(req,res) {
//     const {sd_cdgo}=req.params
//     const {sd_desc,sd_ciudad_cd_cdgo}=req.body
//     try{
//         let sql=`UPDATE sede SET sd_desc=${connection.escape(sd_desc)}, sd_ciudad_cd_cdgo=${connection.escape(sd_ciudad_cd_cdgo)} WHERE sd_cdgo=${connection.escape(sd_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Actualizado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// async function deleteSede(req,res) {
//     const {sd_cdgo}=req.params
//     try{
//         let sql=`UPDATE sede SET sd_estad="false" WHERE sd_cdgo=${connection.escape(sd_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Eliminado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// module.exports = {
//     getSede,
//     getOneSede,
//     addSede,
//     editSede,
//     deleteSede
// }





const pool = require('../config/conection');

const sede = {}

sede.getSede = async(req, res) => {
    pool.query('SELECT * from Sede', (err, resul) => {
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

// sede.addCiudad= async(req,res)=> {
//     const {cd_desc,cd_cdgo}=req.body
//     const datos={
//         cd_cdgo:cd_cdgo,
//         cd_desc:cd_desc,
//         cd_estado:"true"
//     }
//     pool.query('insert into ciudad set ?',datos , (err) => {
//         if (err) throw err;
//         res.json({ status: true });
//     });
// }


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


module.exports = sede