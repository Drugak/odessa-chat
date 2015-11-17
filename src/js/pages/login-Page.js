'use strict';

CHAT.servicesFunctionality.pages({name:"login-Page", template: "/template/login-Page.html"}, ['storage'], function (storage){

    login.onsubmit = function () {
        var e = new XMLHttpRequest;
        return e.open("POST", "/api/authorize", !0),
            e.send(JSON.stringify({
                    name: this.elements.name.value,
                    password: this.elements.password.value
                })
            ),
            this.elements.name.value = "", this.elements.password.value = "", !1
    };

});