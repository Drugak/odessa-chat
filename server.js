var http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    chat = require('./server/models/chat'),
    user = require('./server/modelFunctionality/UserFunctionality'),
    room = require('./server/modelFunctionality/RoomFunctionality'),
    request = require('request'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    mongoose = require('./server/lib/mongoose');


// Static server
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
multer({dest:'./uploads/'}).single();
multer({dest:'./uploads/'}).array();
multer({dest:'./uploads/'}).fields();

// end


mongoose.connection.on('open', function (){
    app.get('/', function(req , res) {
        res.send('index.html');
    });
    app.get('/api/subscribe' , function(req, res) {
        chat.subscribe(req, res);
    });

    app.post('/api/publish', function (req , res) {
        var body = '';

        req.on('readable', function() {
            body += req.read();

            if (body.length > 1e4) {
                res.statusCode = 413;
                res.end("Your message is too big for my little chat");
            }
        })
            .on('end', function() {
                try {
                    console.log('publish post');
                    body = JSON.parse(body);
                } catch (e) {
                    res.statusCode = 400;
                    res.end("Bad Request");
                    return;
                }

                chat.publish(body.message);
                res.end("ok");
            });

    });
    app.post('/api/registration', function(req , res) {
        req.on('readable', function() {
            user.saveUser(
                JSON.parse(req.read()) , req , res
            );
        });
    });
    app.post('/api/authorize' , function(req , res) {

        var body = '';

        req.on('readable', function() {
            body += req.read();
            user.authorize(
                JSON.parse(body) , req , res
            )
        })
    });
    app.put('/api/room-create' , function(req , res) {
        req.on('readable', function() {
            room.roomCreate(
                JSON.parse(req.read()) , req , res
            )
        })
    });
    app.put('/api/room-update-theme' , function(req , res) {
        req.on('readable', function() {
            room.roomUpdateTheme(
                JSON.parse(req.read()) , req , res
            )
        })
    });
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});