'use strict';

var CHAT = {
    servicesFunctionality : {},
    root: {},
    API: {
        servicesList: {},
        pages: [],
        initPage: function (namePage) {

            var templateFunc = {
                    loadTemplate : function(i) {
                        return CHAT.API.servicesList.httpAjax().get(CHAT.API.pages[i].pageInfo.template);
                    },
                    renderTemplate : function(template) {

                        var div = document.createElement('div');
                        div.innerHTML = template;
                        document.getElementById('body').innerHTML= '';

                        document.getElementById('body').appendChild(div);
                    }
                };


            for (var i= 0; i < CHAT.API.pages.length; i++) {

                if(CHAT.API.pages[i].pageInfo.name == namePage ) {

                    templateFunc.loadTemplate(i).then(
                        function(result) {
                            templateFunc.renderTemplate(result);
                            console.log(
                                CHAT.API.pages[i],i
                            );
                            CHAT.API.pages[i -1].pageFn((CHAT.API.servicesList[CHAT.API.pages[i -1].pageServices])());
                        }, function (error) {
                            console.error(error)
                        }
                    )
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
                .add(/login/, function() {
                    CHAT.API.initPage('login-Page');
                })
                .add(/registration/, function() {
                    CHAT.API.initPage('registration-Page');
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
