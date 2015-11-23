'use strict';

CHAT.servicesFunctionality.pages({name:"chat-Page", template: "/template/chatPage/chat-Page.html"}, ['storage' , 'urlData' , 'httpAjax'], function (services){


    var settings = {
        urlSearch : services.urlData.search,
        userName : services.storage.get('userInfo'),
        chatMessHtml : services.httpAjax.get("/template/chatPage/microTemplate/chatMessage.html").then(function(respons){
            settings.chatMessHtml = respons
        }, function(err) {
            console.err(err);
        })
    };

    var API = {
        checkChatRoom : function() {
            return settings.urlSearch.roomName != undefined ? {roomName : settings.urlSearch.roomName} : 'baseRoom';
        },
        checkNewMessages : function() {
            (function e() {
                var xhr = new XMLHttpRequest;
                xhr.open("POST", "/api/subscribe", true), xhr.onreadystatechange = function () {
                    if (4 == this.readyState) {
                        if (200 != this.status)return void setTimeout(e, 500);

                        var messageHtml = tmpl(settings.chatMessHtml, JSON.parse(this.responseText));
                        messages.innerHTML = messageHtml;
                    }
                }, xhr.send(JSON.stringify(API.checkChatRoom()))
            }());
        }
    };


    API.checkNewMessages();

    publish.onsubmit = function () {
        var e = new XMLHttpRequest;
        var reqData = {
            userName: settings.userName.username,
            message : this.elements.messages.value,
            roomName : API.checkChatRoom().roomName
        };
        return e.open("POST", "/api/publish", !0),
                e.send(JSON.stringify(reqData)), this.elements.messages.value = "", !1
    };

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

});