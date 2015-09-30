var mongoose = require('../lib/mongoose'),
    User = require('../models/User').User,
    async = require('async');



//
// Registration
exports.saveUser = function (data , req , res) {

    var name = data.name,
        password = data.password;

    function serverResponse (statusCode , statusMessage , user) {
        res.statusCode = statusCode;
        res.statusMessage = statusMessage;
        res.send(user);
    }

    function findName () {
        User.findOne({username: name}, function(err , obj) {
            if(err) throw err;

            if(obj) {
                serverResponse(403 , 'This name employing!');
            } else {
                createAndSave();
            }
        });
    }

    function createAndSave () {

        var newUser = new User({
            username: name,
            password: password
        });

        newUser.save(function(err) {
            if(err) throw err;
        });

        serverResponse(200 , 'Success registration!');
    }

    findName();
};



//
// Login
exports.authorize  = function(desire , req , res) {

    var name = desire.name,
        password = desire.password;


    function serverResponse (statusCode , statusMessage , user) {
        res.statusCode = statusCode;
        res.statusMessage = statusMessage;
        res.send(user);
    }

    function findName () {
        User.findOne({username: name}, function(err , obj) {
            if(err) throw err;

            if(obj != null) {
                findPassword(obj);
            } else {
                serverResponse(404 , 'Not found this user name');
            }
        });
    }

    function findPassword(user) {
        user.password == password ?
            serverResponse(200 , 'Success login' , user) :
            serverResponse(400 , 'Incorrect password');
    }

    findName();

    //TODO: develop tokin

};