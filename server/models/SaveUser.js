var mongoose = require('../lib/mongoose'),
    User = require('./User').User;


exports.saveUser = function (data) {

    var newUser = new User({
        username: data.name,
        password: data.password
    });

    newUser.save(function(err) {
        if(err) throw err;
    });

    //mongoose.disconnect();
};
