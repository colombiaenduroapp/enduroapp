'use strict'
 

const util=require('util')
const connection= require('../config/conection')



const query=util.promisify(connection.query).bind(connection)


async function getCiudad(req,res) {
    // res.json({message: 'recuperando ciudades '} )
    let sql=`select * from ciudad where cd_estado="true"`
    const rows= await query(sql)
    res.json(rows)
}

async function getOneCiudad(req,res) {
    const {cd_cdgo}=req.params
    try{
        let sql=`select * from ciudad where cd_cdgo=${connection.escape(cd_cdgo)}`
        const rows= await query(sql)
        res.json(rows)
    }catch{
        console.error('haocurrido un error');
    }
}

async function addCiudad(req,res) {
    const {cd_desc}=req.body
    try{
        let sql=`insert into ciudad(cd_desc,cd_estado) values(${connection.escape(cd_desc)},"true")`
        const rows= await query(sql)
        res.json({message:`${cd_desc} registrado correctamente!`})
    }catch(exception){
        res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
    }
}

async function editCiudad(req,res) {
    const {cd_cdgo}=req.params
    const {cd_desc}=req.body
    try{
        let sql=`UPDATE ciudad SET cd_desc=${connection.escape(cd_desc)} WHERE cd_cdgo=${connection.escape(cd_cdgo)}`
        const rows= await query(sql)
        res.json({message:`Actualizado correctamente!`})
    }catch(exception){
        res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
    }
}

async function deleteCiudad(req,res) {
    const {cd_cdgo}=req.params
    try{
        let sql=`UPDATE ciudad SET cd_estado="false" WHERE cd_cdgo=${connection.escape(cd_cdgo)}`
        const rows= await query(sql)
        res.json({message:`Eliminado correctamente!`})
    }catch(exception){
        res.json({message:`Ha ocurrido un error en la peticion: ${exception} `})
    }
}


module.exports = {
    getCiudad,
    getOneCiudad,
    addCiudad,
    editCiudad,
    deleteCiudad
}