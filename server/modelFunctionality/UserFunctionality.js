var mongoose = require('../lib/mongoose'),
    service = require('../service/serverResponse_Service'),
    User = require('../models/User').User,
    async = require('async');



//
// Registration
exports.saveUser = function (data , req , res) {

    var name = data.name,
        password = data.password;

    function findName () {
        User.findOne({username: name}, function(err , obj) {
            if(err) throw err;

            if(obj) {
                service.serverResponse(res, 403 , 'This name employing!');
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

        service.serverResponse(res, 200 , 'Success registration!');
    }

    findName();
};



//
// Login
exports.authorize  = function(desire , req , res) {

    var name = desire.name,
        password = desire.password;


    function findName () {
        User.findOne({username: name}, function(err , obj) {
            if(err) throw err;

            if(obj != null) {
                findPassword(obj);
            } else {
                service.serverResponse(res, 404 , 'Not found this user name');
            }
        });
    }

    function findPassword(user) {
        user.password == password ?
            service.serverResponse(res, 200 , 'Success login' , user) :
            service.serverResponse(res, 400 , 'Incorrect password');
    }

    findName();

    //TODO: develop tokin

};