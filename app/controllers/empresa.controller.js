// 'use strict'
 

// const util=require('util')
// const connection= require('../config/conection')
// const query=util.promisify(connection.query).bind(connection)

// async function getEmpresa(req,res) {
//     let sql=`select * from empresa where em_estado="true"`
//     const rows= await query(sql)
//     res.json(rows)
// }

// async function getOneEmpresa(req,res) {
//     const {em_cdgo}=req.params
//     try{
//         let sql=`select * from empresa where em_cdgo=${connection.escape(em_cdgo)}`
//         const rows= await query(sql)
//         res.json(rows)
//     }catch{
//         console.error('haocurrido un error');
//     }
// }


// async function addEmpresa(req,res) {
//     const {em_nit,em_nombre,em_desc,em_telefono,em_correo}=req.body
//     try{
//         let sql=`insert into empresa(em_nit,em_nombre,em_desc,em_telefono,em_correo,em_estado) values(${connection.escape(em_nit)},${connection.escape(em_nombre)},${connection.escape(em_desc)},${connection.escape(em_telefono)},${connection.escape(em_correo)},"true")`
//         const rows= await query(sql)
//         res.json({message:`Registrado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// async function editEmpresa(req,res) {
//     const {em_cdgo}=req.params
//     const {em_nit,em_nombre,em_desc,em_telefono,em_correo}=req.body
//     try{
//         let sql=`UPDATE empresa SET em_nit=${connection.escape(em_nit)},em_nombre=${connection.escape(em_nombre)},em_desc=${connection.escape(em_desc)},em_telefono=${connection.escape(em_telefono)},em_correo=${connection.escape(em_correo)} WHERE em_cdgo=${connection.escape(em_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Actualizada correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// async function deleteEmpresa(req,res) {
//     const {em_cdgo}=req.params
//     try{
//         let sql=`UPDATE empresa SET em_estado="false" WHERE em_cdgo=${connection.escape(em_cdgo)}`
//         const rows= await query(sql)
//         res.json({message:`Eliminado correctamente!`})
//     }catch(exception){
//         res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
//     }
// }


// module.exports = {
//     getEmpresa,
//     getOneEmpresa,
//     addEmpresa,
//     editEmpresa,
//     deleteEmpresa
// }