'use strict';

var CHAT = {
    servicesFunctionality : {},
    root: {},
    API: {
        servicesList: {},
        pages: [],
        initPage: function (namePage) {
            console.log('namePage', namePage);
            for (var i= 0; i < CHAT.API.pages.length; i++) {
                CHAT.API.pages[i].name == namePage ?
                    (
                        CHAT.API.pages[i].pageFn((CHAT.API.servicesList[CHAT.API.pages[i].pageServices])()
                        )
                    ): undefined;
                //TODO:переписать это говно , добавить проверку на отсуствие сервиса , вывод ошибки , сделать отдельным модулем
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
CHAT.servicesFunctionality.pages = function(name,services,pageFn){
    var pageName = name,
        pageCode = pageFn,
        pageServices = services;


    CHAT.API.pages.push(
        {
            name: pageName,
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
    alert('init');
    CHAT.API.initPage('home-Page');
}

setTimeout(innit, 3000);
