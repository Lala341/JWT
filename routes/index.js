var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

HandlerGenerator.generateData();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);


router.get('/eventos', middleware.checkToken, HandlerGenerator.eventos);

router.get('/perfil', middleware.checkToken, HandlerGenerator.perfil);

router.post( '/login', HandlerGenerator.login);

router.post('/eventos', middleware.checkToken, HandlerGenerator.creareventos);

module.exports = router;