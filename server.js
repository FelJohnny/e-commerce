const app = require('./src/app.js');
const express = require('express');
const path =require('path')

const PORT = 3333;

const https = require('https');
const fs = require('fs');

 const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/felipejohnny.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/felipejohnny.com/fullchain.pem')
}; 
//necessario para que as imagens sejam acessiveis via caminho ex: 'http://localhost:3000/public/uploads/images/1712918282155_img.png'
app.use('/public/uploads/images',express.static(path.join('public/uploads/images')))

const server = https.createServer(httpsOptions,app);

server.listen(PORT,()=>{
    console.log("Servidor ligado na porta: " + PORT );
})