var express = require('express');
let bodyParser=require('body-parser')
var router = express.Router();

let jsonParser = bodyParser.json();


var userService = require('../services/user.service');

/* GET users listing. */
router.get('/getAll', function(req, res, next) {
    userService.getAllUsers().then( function (users) { //appel du promise UserService, puis
        //(.then) exécuter, si retour d'un JSON (qu'on appelle arbitrairement "users") la fonction
        // dans { }
        res.send(users);
    });
});

/* POST users in the DB */
router.post('/add',jsonParser, function (req, res, next) {
    userService.addUser(req.body).then(function (users){
        res.send(users);
    });
});


/* DELETE users in the DB */
router.delete('/remove', function (req, res, next) {
    userService.deleteUser(req.body).then(function (users){
        res.send(users);
    });
});

/* UPDATE the information of an user in the DB */
router.put('/update', function (req, res, next) {
    userService.updateUser(req.body).then(function (users){
        res.send(users);
    });
});


module.exports = router;