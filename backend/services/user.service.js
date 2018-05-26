var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var userSchema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    carId: {type: String},
    amount: {type:Number,default:0}
});

//CI DESSUS la description de la structure de la collection + les prérequis(require etc...)
//Nécessaire pour la suite
//ne pas oublier de se co à la BDD dans app.js

var User = mongoose.model('User', userSchema); //creation du modèle, on appliquera toutes les
// requetes a User

class UserService { // promise/class exporté en bas qui sera réutilisé dans user.js avec le .then
    getAllUsers() {
        return User.find({}); //chercher tout de la collection User
    }

    getUser(user) {
        return User.find({email: user.email});
    }

    addUser(user) {
        //création d'un nouveau document destiné à la DB
        var newUser = new User({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            carId: user.carId,
            amount: user.amount
        });
        //enregistrement dans la DB
        return newUser.save();
    }

    deleteUser(user) {
        //on trouve l'id de l'user rentré par le résultat "user" (en paramètre) du formulaire
        var User = (User.find({ email: user.email}));
        var idUser = User._id;
        var o_idUser = ObjectId(idUser);
        //on supprime ledit user
        return User.findOneAndRemove(o_idUser);
    }

    updateUser(user, new_user) {
        var idUser = (User.find(user))._id;
        return User.collection.update({_id: idUser}, {$set: new_user});
    }
}

module.exports = new UserService();