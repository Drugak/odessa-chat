/**
 * Created by Noxval on 17.09.15.
 */
var clients = {},
    service = require('../service/serverResponse_Service');

exports.subscribe = function(request, response , data) {

    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    if(!clients[data.roomName]) clients[data.roomName] = [];

    clients[data.roomName].push(response);

    response.on('close', function() {
        clients[data.roomName].splice(clients[data.roomName].indexOf(response), 1);
    });
};



exports.publish = function(body) {

    if(!clients[body.roomName]) clients[body.roomName] = [];

    clients[body.roomName].forEach(function(response) {
        //response.send(body);
        response.send(body.message , body.userName);
        //service.serverResponse(response,200,'Message send success',body);
    });
};
