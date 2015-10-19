CHAT.servicesFunctionality.services('httpAjax', function(url , params) {

    var xhr = new XMLHttpRequest(),
        _url = url,
        _params = params;
    return {
        get: function () {
            return {
                open: function ( __url , __params){
                    var params = __params,
                        url = __url;
                        xhr.open("GET", url + (params? params: ''), true);
                    },

                send: function (){
                    return xhr.send();
                }
            }
        }
    }
});