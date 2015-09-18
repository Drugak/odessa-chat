/**
 * Created by Noxval on 17.09.15.
 */
var clients = [];

exports.subscribe = function(request, response) {
    console.log("subscribe");

    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients.push(response);

    response.on('close', function() {
        clients.splice(clients.indexOf(response), 1);
    });
};

exports.publish = function(message) {
    console.log("publish '%s'", message);

    clients.forEach(function(response) {
        console.log("send to client");
        response.end(message);
    });

    clients = [];
};

setInterval(function() {
    console.log(clients.length);
}, 5000);