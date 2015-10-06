var mongoose = require('../lib/mongoose'),
    Rooms = require('../models/Room').Rooms,
    service = require('../service/serverResponse_Service'),
    entityRooms = require('../entity/entityRooms');


exports.roomCreate = function(updateObj , req , res) {
    var newRoom = new Rooms({
        room: {
            id: updateObj.id,
            name: updateObj.name,
            messageCount: 0,
            listThems: [],
            lastDateMessage: 0
        }
    });

    newRoom.save(function(err , newRoom) {

        if(err) throw  err;
        service.serverResponse(res, 200 , "Successful create new room", newRoom);
    });
};




exports.roomUpdateTheme = function(theme , req , res) {

    Rooms.update(
        {"room.id":theme.id},{
            $pushAll:{
                "room.listThems": [{
                    "name": theme.name,
                    "lastMess": 0,
                    "messCount": 0
                }]
            }
        },
        {
            upsert:true
        },
        function(err , newTheme) {

            if(err) throw err;
            service.serverResponse(res , 200 , "Successful create new theme", newTheme);
        }
    );
};

