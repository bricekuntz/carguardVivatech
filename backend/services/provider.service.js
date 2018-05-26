var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var providerSchema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    amount: {type: Number, default: 0}
});

//CI DESSUS la description de la structure de la collection + les prérequis(require etc...)
//Nécessaire pour la suite
//ne pas oublier de se co à la BDD dans app.js

var Provider = mongoose.model('Provider', providerSchema); //creation du modèle, on appliquera toutes les
// requetes a Provider

class ProviderService { // promise/class exporté en bas qui sera réutilisé dans provider.js avec le .then
    getAllProviders() {
        return Provider.find({}); //chercher tout de la collection Provider
    }

    getProvider(provider) {
        return Provider.find({email: provider.email});
    }

    addProvider(provider) {
        //création d'un nouveau document destiné à la DB
        var newProvider = new Provider({
            firstname: provider.firstname,
            lastname: provider.lastname,
            email: provider.email,
            password: provider.password,
            amount: provider.amount
        });
        //enregistrement dans la DB
        return newProvider.save();
    }

    deleteProvider(provider) {
        //on trouve l'id de l'provider rentré par le résultat "provider" (en paramètre) du formulaire
        var Provider = (Provider.find({email: provider.email}));
        var idProvider = Provider._id;
        var o_idProvider = ObjectId(idProvider);
        //on supprime ledit provider
        return Provider.findOneAndRemove(o_idProvider);
    }

    updateProvider(provider, new_provider) {
        var idProvider = (Provider.find(provider))._id;
        return Provider.collection.update({_id: idProvider}, {$set: new_provider});
    }
}

module.exports = new ProviderService();