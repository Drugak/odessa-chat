function serverResponse (res, statusCode , statusMessage , body) {
    res.statusCode = statusCode;
    res.statusMessage = statusMessage;
    res.send(body);
};

exports.serverResponse = serverResponse;