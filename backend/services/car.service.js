var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var carSchema = mongoose.Schema({
    carId: {type: String},
    marque: {type: String},
    modele: {type: String},
    immatriculation: {type: String},
    couleur: {type: String}
});

//CI DESSUS la description de la structure de la collection + les prérequis(require etc...)
//Nécessaire pour la suite
//ne pas oublier de se co à la BDD dans app.js

var Car = mongoose.model('Car', carSchema); //creation du modèle, on appliquera toutes les
// requetes a Car

class CarService { // promise/class exporté en bas qui sera réutilisé dans Car.js avec le .then
    getAllCars() {
        return Car.find({}); //chercher tout de la collection Car
    }

    getCar(car) {
        return Car.find({carId: car.carId});
    }

    addCar(car) {
        //création d'un nouveau document destiné à la DB
        var newCar = new Car({

            carId: car.carId,
            marque: car.marque,
            modele: car.modele,
            immatriculation: car.immatriculation,
            couleur: car.couleur
        });
        //enregistrement dans la DB
        return newCar.save();
    }

    deleteCar(car) {
        //on trouve l'id de l'car rentré par le résultat "car" (en paramètre) du formulaire
        var Car = (Car.find({ carId: car.carId}));
        var idCar = Car._id;
        var o_idCar = ObjectId(idCar);
        //on supprime ledit car
        return Car.findOneAndRemove(o_idCar);
    }

    updateCar(car, new_car) {
        var idCar = (Car.find(car))._id;
        return Car.collection.update({_id: idCar}, {$set: new_car});
    }
}

module.exports = new CarService();