var express = require('express');
let bodyParser=require('body-parser')
var router = express.Router();

let jsonParser = bodyParser.json();


var serviceService = require('../services/service.service');

/* GET services listing. */
router.get('/getAll', function(req, res, next) {
    serviceService.getAllServices().then( function (services) { //appel du promise ServiceService, puis
        //(.then) exécuter, si retour d'un JSON (qu'on appelle arbitrairement "services") la fonction
        // dans { }
        res.send(services);
    });
});

/* POST services in the DB */
router.post('/add',jsonParser, function (req, res, next) {
    serviceService.addService(req.body).then(function (services){
        console.log(req,"cest le req");
        res.send(services);
    });
});


/* DELETE services in the DB */
router.delete('/remove', function (req, res, next) {
    serviceService.deleteService(req.body).then(function (services){
        res.send(services);
    });
});

/* UPDATE the information of an service in the DB */
router.put('/update', function (req, res, next) {
    serviceService.updateService(req.body).then(function (services){
        res.send(services);
    });
});


module.exports = router;