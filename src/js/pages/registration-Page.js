'use strict';

CHAT.servicesFunctionality.pages({name:"registration-Page", template: "/template/registration-Page.html"}, ['storage'], function (storage){
    registration.onsubmit = function () {
        var e = new XMLHttpRequest;
        return e.open("POST", "/api/registration", !0),
            e.send(JSON.stringify({
                    name: this.elements.name.value,
                    password: this.elements.password.value
                })
            ),
            this.elements.name.value = "", this.elements.password.value = "", !1
    };
});