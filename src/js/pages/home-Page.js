'use strict';

CHAT.servicesFunctionality.pages({name:"home-Page", template: "/template/homePage/home-Page.html"}, ['storage', 'mediator' , 'httpAjax'], function (services){

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
    //
    //roomsTheme.onsubmit = function () {
    //    var e = new XMLHttpRequest;
    //    return e.open("PUT", "/api/room-update-theme", !0),
    //        e.send(JSON.stringify({
    //                name: this.elements.name.value,
    //                id: this.elements.id.value
    //            })
    //        ),
    //        this.elements.name.value = "", this.elements.id.value = "", !1
    //};

    //services.storage();
    //services.mediator();
    var results = document.getElementById("home-Page");

    var allRooms = services.httpAjax.get('/api/getAllRooms');
        allRooms.then(function(respons) {
            var rooms = JSON.parse(respons);
            return Promise.all(rooms)
        } , function (err) {
            console.error(err);
        }).then(function (rooms) {
            var microRoom = services.httpAjax.get('/template/homePage/microTemplate/home-Page_micro-Room-block.html');
            microRoom.then(function(respons) {
                var roomsHtml = '';
                for (var i = 0; i < rooms.length; i++) {
                    roomsHtml += tmpl(respons, rooms[i]);
                }
                results.innerHTML = roomsHtml;
                CHAT.API.servicesList.router().linkSettings();
            } , function (err) {
                console.error(err);
            });
        })
});


