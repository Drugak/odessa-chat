'use strict';

CHAT.servicesFunctionality.pages({name:"login-Page", template: "/template/login-Page.html"}, ['storage' , 'httpAjax'], function (services){

    //
    //login.onsubmit = function () {
    //    var e = new XMLHttpRequest;
    //    return e.open("POST", "/api/authorize", !0),
    //        e.send(JSON.stringify({
    //                name: this.elements.name.value,
    //                password: this.elements.password.value
    //            })
    //        ),
    //        this.elements.name.value = "", this.elements.password.value = "", !1
    //};


    login.onsubmit = function (e) {

        e.preventDefault();
        var loginPost = services.httpAjax.post(
            '/api/authorize' ,
            JSON.stringify({
                name: this.elements.name.value,
                password: this.elements.password.value
            })
        );

        loginPost.then(function(respons) {
            services.storage.push('userInfo' , respons);
        }, function(err) {
            console.error(err);
        })
    };

});