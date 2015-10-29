CHAT.servicesFunctionality.services('httpAjax', function(url , params) {

    var xhr = new XMLHttpRequest(),
        _url = url,
        _params = params;
    return {
        get: function (url) {
            return new Promise(function(resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function() {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function() {
                    reject(new Error("Network Error"));
                };

                xhr.send();
            });

        }
    }
});