var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var serviceSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    category: {type: String},
    price: {type: Number, default: 0},
    time: {type: Number, default: 0},
    is_accepted: {type: Boolean, default: false},
    is_booked: {type: Boolean, default: false},
});

//CI DESSUS la description de la structure de la collection + les prérequis(require etc...)
//Nécessaire pour la suite
//ne pas oublier de se co à la BDD dans app.js

var Service = mongoose.model('Service', serviceSchema); //creation du modèle, on appliquera toutes les
// requetes a Service

class ServiceService { // promise/class exporté en bas qui sera réutilisé dans service.js avec le .then
    getAllServices() {
        return Service.find({}); //chercher tout de la collection Service
    }

    getService(service) {
        return Service.find({email: service.email});
    }

    addService(service) {
        console.log(service,"test");
        //création d'un nouveau document destiné à la DB
        var newService = new Service({
            name: service.name,
            description: service.description,
            category: service.category,
            price: service.price,
            time: service.time,
            is_accepted: service.is_accepted,
            is_booked: service.is_booked
        });
        //enregistrement dans la DB
        return newService.save();
    }

    deleteService(service) {
        //on trouve l'id de l'service rentré par le résultat "service" (en paramètre) du formulaire
        var Service = (Service.find({email: service.email}));
        var idService = Service._id;
        var o_idService = ObjectId(idService);
        //on supprime ledit service
        return Service.findOneAndRemove(o_idService);
    }

    updateService(service, new_service) {
        var idService = (Service.find(service))._id;
        return Service.collection.update({_id: idService}, {$set: new_service});
        Service.findByIdAndUpdate(
            // the id of the item to find
            req.params.serviceId,

            // the change to be made. Mongoose will smartly combine your existing
            // document with this change, which allows for partial updates too
            req.body,

            // an option that asks mongoose to return the updated version
            // of the document instead of the pre-updated one.
            {new: true},

            // the callback function
            (err, service) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send(err);
            }
        )
    }
}

module.exports = new ServiceService();