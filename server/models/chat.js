/**
 * Created by Noxval on 17.09.15.
 */
var clients = {};

exports.subscribe = function(request, response , data) {

    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    if(!clients[data.roomName]) clients[data.roomName] = [];

    clients[data.roomName].push(response);
    console.log(clients[data.roomName]);
    //clients.push(response);

    response.on('close', function() {
        clients[data.roomName].splice(clients[data.roomName].indexOf(response), 1);
    });
};



exports.publish = function(body) {

    if(!clients[body.roomName]) clients[body.roomName] = [];

    clients[body.roomName].forEach(function(response) {
        response.end(body.message);
    });

    clients[body.roomName] = [];
};
