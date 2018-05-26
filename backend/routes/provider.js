var express = require('express');
let bodyParser=require('body-parser')
var router = express.Router();

let jsonParser = bodyParser.json();


var providerService = require('../services/provider.service');

/* GET providers listing. */
router.get('/getAll', function(req, res, next) {
    providerService.getAllProviders().then( function (providers) { //appel du promise ProviderService, puis
        //(.then) exécuter, si retour d'un JSON (qu'on appelle arbitrairement "providers") la fonction
        // dans { }
        res.send(providers);
    });
});

/* POST providers in the DB */
router.post('/add',jsonParser, function (req, res, next) {
    providerService.addProvider(req.body).then(function (providers){
        res.send(providers);
    });
});


/* DELETE providers in the DB */
router.delete('/remove', function (req, res, next) {
    providerService.deleteProvider(req.body).then(function (providers){
        res.send(providers);
    });
});

/* UPDATE the information of an provider in the DB */
router.put('/update', function (req, res, next) {
    providerService.updateProvider(req.body).then(function (providers){
        res.send(providers);
    });
});


module.exports = router;