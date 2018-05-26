var express = require('express');
let bodyParser=require('body-parser')
var router = express.Router();

let jsonParser = bodyParser.json();


var carService = require('../services/car.service');

/* GET cars listing. */
router.get('/getAll', function(req, res, next) {
    carService.getAllCars().then( function (cars) { //appel du promise CarService, puis
        //(.then) exécuter, si retour d'un JSON (qu'on appelle arbitrairement "cars") la fonction
        // dans { }
        res.send(cars);
    });
});

/* POST cars in the DB */
router.post('/add',jsonParser, function (req, res, next) {
    carService.addCar(req.body).then(function (cars){
        res.send(cars);
    });
});


/* DELETE cars in the DB */
router.delete('/remove',jsonParser, function (req, res, next) {
    carService.deleteCar(req.body).then(function (cars){
        res.send(cars);
    });
});

/* UPDATE the information of an car in the DB */
router.put('/update',jsonParser, function (req, res, next) {
    carService.updateCar(req.body).then(function (cars){
        res.send(cars);
    });
});


module.exports = router;