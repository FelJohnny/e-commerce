const app = require('./src/app.js');
const express = require('express');
const path =require('path')

const PORT = 3333;

//necessario para que as imagens sejam acessiveis via caminho ex: 'http://localhost:3000/public/uploads/images/1712918282155_img.png'
app.use('/public/uploads/images',express.static(path.join('public/uploads/images')))

app.listen(PORT,()=>{
    console.log("Servidor ligado na porta: " + PORT );
})