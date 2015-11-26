'use strict';

CHAT.servicesFunctionality.pages(
    {
        name:"chat-Page",
        pageTitle:"Чат, главная комната",
        template: "/template/chatPage/chat-Page.html"
    },
    ['storage' , 'urlData' , 'httpAjax'],
    function (services){

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
            return settings.urlSearch.roomName != undefined ? {roomName : settings.urlSearch.roomName} : {roomName : 'baseRoom'};
        },
        changeTitle : function (title) {
            if (title.roomName !== 'baseRoom') CHAT.baseServices.changeTitle("Чат - "+title.roomName);
        }
    };


    API.changeTitle(
        API.checkChatRoom()
    );


    (function e() {
        var t = new XMLHttpRequest;
        t.open("POST", "/api/subscribe", true), t.onreadystatechange = function () {
            if (4 == this.readyState) {
                if (200 != this.status)return void setTimeout(e, 500);

                var t = document.createElement("li"),
                    messageHtml = tmpl(settings.chatMessHtml, JSON.parse(this.responseText));

                t.innerHTML = messageHtml;
                messages.appendChild(t);

                e();
            }
        }, t.send(JSON.stringify(API.checkChatRoom()))
    }());

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