const express = require('express');
const multer = require('multer');
const passport = require('passport');


const routes = express.Router();

// req.query = acessar query params (busca, filtros, get)
// req.params = acessar route params (edição, delete)
// req.body = acessar corpo da requisição (edição, delete)
//commit teste


routes.get('/', function(req, res){
    console.log('Hello world!');
    return res.send('ok');
});

module.exports = routes;