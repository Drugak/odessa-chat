'use strict';

var CHAT = {
    servicesFunctionality : {},
    root: {},
    API: {
        servicesList: {},
        pages: [],
        initPage: function (namePage) {
            for (var i= 0; i < CHAT.API.pages.length; i++) {
                if(CHAT.API.pages[i].pageInfo.name == namePage ) {
                    CHAT.API.pages[i].pageFn((CHAT.API.servicesList[CHAT.API.pages[i].pageServices])());
                    CHAT.API.servicesList.httpAjax().get().open(CHAT.API.pages[i].pageInfo.template);
                }
            }
        },
        initApp : function(router) {
            var Router = router;
            Router().config({ mode: 'history'});

            Router().navigate();

            Router()
                .add(/about/, function() {
                    console.log('about');
                    CHAT.API.initPage('about-Page');
                })
                .add(/chat/, function() {
                    console.log('chat');
                    CHAT.API.initPage('home-Page');
                })
                .add(/test/, function() {
                    console.log('test');
                })
                .listen();

            Router().navigate('/');

            var linckTag = document.getElementsByTagName("a");

            for (var i = 0; i < linckTag.length; i++) {
                linckTag[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    Router().navigate(e.srcElement.pathname);
                });
            }
        }
    }
};


/**
 * This  servicesFunctionality.services , he brings together services in Singleton, and then provides access to these services COMPONENT
 */
CHAT.servicesFunctionality.services = function (name,service) {
    var nameMe = name,
        serviceMe = service;

    CHAT.API.servicesList[nameMe] = serviceMe;
};



/**
 * This  servicesFunctionality.pages , he brings together pages controllers , then when rout call some pages , this page init and rendering
 */
CHAT.servicesFunctionality.pages = function(__pageInfo,services,pageFn){
    var _pageInfo = __pageInfo,
        pageCode = pageFn,
        pageServices = services;


    CHAT.API.pages.push(
        {
            pageInfo: _pageInfo,
            pageFn: pageCode,
            pageServices: pageServices
        }
    );
};



/**
 * This  components builder.
 */




//TODO:написать метод для проверки строк при агрегации сервисов
//TODO:написать метод для выброма ошибок и работы с ними
//TODO:сделать приватный апи для работы ядра

function innit () {
    CHAT.API.initApp(CHAT.API.servicesList.router);
}

setTimeout(innit, 3000);
