'use strict';

CHAT.servicesFunctionality.pages({name:"home-Page", template: "/template/home-Page.html"}, ['storage'], function (storage){
    alert('home');
    rooms.onsubmit = function () {
        var e = new XMLHttpRequest;
        return e.open("PUT", "/api/room-create", !0),
            e.send(JSON.stringify({
                    name: this.elements.name.value,
                    id: this.elements.id.value
                })
            ),
            this.elements.name.value = "", this.elements.id.value = "", !1
    };

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

    roomsTheme.onsubmit = function () {
        var e = new XMLHttpRequest;
        return e.open("PUT", "/api/room-update-theme", !0),
            e.send(JSON.stringify({
                    name: this.elements.name.value,
                    id: this.elements.id.value
                })
            ),
            this.elements.name.value = "", this.elements.id.value = "", !1
    };

    (function e() {
        var t = new XMLHttpRequest;
        t.open("GET", "/api/subscribe", !0), t.onreadystatechange = function () {
            if (4 == this.readyState) {
                if (200 != this.status)return void setTimeout(e, 500);
                var t = document.createElement("li");
                t.appendChild(document.createTextNode(this.responseText)), messages.appendChild(t), e()
            }
        }, t.send(null)
    }());

    publish.onsubmit = function () {
        var e = new XMLHttpRequest;
        return e.open("POST", "/api/publish", !0), e.send(JSON.stringify({message: this.elements.message.value})), this.elements.message.value = "", !1
    };

    storage.clear();

});