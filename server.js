var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    chat = require('./server/chat'),
    express = require('express'),
    path = require('path'),
    app = express(),
    saveUser = require('./server/models/SaveUser'),
    request = require('request'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    mongoose = require('./server/lib/mongoose');



// Static server
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
multer({dest:'./uploads/'}).single()
multer({dest:'./uploads/'}).array()
multer({dest:'./uploads/'}).fields()

// end


mongoose.connection.on('open', function (){
    app.get('/', function(req , res) {
        res.send('index.html');
    });
    app.get('/subscribe' , function (req, res) {
        chat.subscribe(req, res);
    });
    app.post('/publish', function (req , res) {
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
    app.post('/registration', function(req , res) {
        var body = '';

        req.on('readable', function() {
            body += req.read();
            saveUser.saveUser(
                JSON.parse(body)
            );
        })
            .on('end', function() {
                res.end("ok");
            });
    });
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});