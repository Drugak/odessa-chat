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

                    xhr.send();

                    xhr.onreadystatechange = function() {

                        if (this.readyState == 4) console.log(this.response);

                        // по окончании запроса доступны:
                        // status, statusText
                        // responseText, responseXML (при content-type: text/xml)

                        if (this.status != 200) {
                            // обработать ошибку
                            alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
                            return;
                        }
                    }

                },

                send: function (){
                    return xhr.send();
                }
            }
        }
    }
});