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