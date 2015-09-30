var mongoose = require('../lib/mongoose'),
    Rooms = require('../models/Room').Rooms,
    entityRooms = require('../entity/entityRooms');


exports.roomUpdate = function(updateObj , req , res) {

    Rooms.update(
        {"room.id":updateObj.id},
        {$set:{"room.name":updateObj.name}},
        function(err){
            if(err) throw err;
        }
    );

    Rooms.find({"room.id": updateObj.id} , function(err, user){
        res.send(user);
    })

};

