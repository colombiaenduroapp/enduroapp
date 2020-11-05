var mysql = require('mysql');
var connection = mysql.createConnection({
   host: '198.71.225.61',
   user: 'jepore',
   password: '8O!gsk05',
   database: 'enduroapp',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});



module.exports = connection