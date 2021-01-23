const utilImage = {} 
const utilText = {}

utilImage.guardarImagen = async(imageName, image, imagePath) => {
    let nombre_sin_espacio = imageName.split(" ").join("") //quita los espacios al nombre
    let date = new Date();
    let nombre_imagen = date.getTime() + '_' + nombre_sin_espacio + '.png' // nombre de la logo, consta de un datatime y el nombre de la sede 
    let data = image.replace(/^data:image\/\w+;base64,/, ''); // remueve valores innecesarios del data base64
    let realFile = Buffer.from(data, "base64"); // decodifica el base64 a una imagen
    //almacena la logo en el servidor
    fs.writeFile(imagePath + nombre_imagen, realFile, function(err) {
        if (err)
            console.log(err);
    });
    return nombre_imagen;
};


module.exports = {
    utilImage,
    utilText
}