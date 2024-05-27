//upload de arquivos
const multer = require('multer')
const path = require('path')
module.exports = (multer({
    storage:multer.diskStorage({
        destination: (req, file,callback)=>{
            callback(null,'./public/uploads/images')
        },
        filename:(req,file,callback)=>{
            callback(null, Date.now().toString() +'_img'+ path.extname(file.originalname))
        }
    }),
    fileFilter: (req,file, callback)=>{
        const extencaoImg = ['image/png','image/jpg','image/jpeg','image/webp'].find
        (formatoAceito => formatoAceito == file.mimetype);
        if(extencaoImg){
            return callback(null,true);
        }
        console.log('imagem sem o formato necessario');
        return callback(null, false)
    }
}))
