'use strict';

var CHAT = {
    servicesFunctionality : {},
    config : {
        urlsConfig : {
            //TODO create servisec for generate short url for download microTemplates
        }
    },
    API: {
        servicesList: {},
        pages: [],
        cashTemplates: {},
        initPage: function (namePage) {

            var templateFunc = {
                    loadTemplate : function(i) {
                        var thisCashTemplates = CHAT.API.cashTemplates[CHAT.API.pages[i].pageInfo.name.replace("-","_")];

                        if (!thisCashTemplates) {
                            var tpl = CHAT.API.servicesList.httpAjax().get(CHAT.API.pages[i].pageInfo.template , 'GET');
                            CHAT.API.cashTemplates[CHAT.API.pages[i].pageInfo.name.replace("-","_")] = tpl;

                            return tpl;
                        }

                        return thisCashTemplates;
                    },
                    renderTemplate : function(template) {

                        var div = document.createElement('div');
                        div.innerHTML = template;
                        document.getElementById('body').innerHTML= '';
                        document.getElementById('body').appendChild(div);
                        //TODO:оптимизировать и вынести в отдельный класс
                        CHAT.API.servicesList.router().linkSettings();
                    },
                    concatService : function(countPage) {

                        var serviceForPage = {};
                        for (var z = 0; z < CHAT.API.pages[countPage].pageServices.length; z++) {
                            serviceForPage[CHAT.API.pages[countPage].pageServices[z]] = (CHAT.API.servicesList[CHAT.API.pages[countPage].pageServices[z]])();
                        }

                        return serviceForPage;
                    }
                };


            for (var i= 0; i < CHAT.API.pages.length; i++) {

                if(CHAT.API.pages[i].pageInfo.name == namePage ) {

                    var countPage = i;

                    templateFunc.loadTemplate(i).then(
                        function(result) {
                            templateFunc.renderTemplate(result);
                            CHAT.API.pages[countPage].pageFn(templateFunc.concatService(countPage));
                        }, function (error) {
                            console.error(error)
                        }
                    )
                }
            }
        },
        initApp : function(router) {
            var Router = router;

            Router().navigate();

            Router()
                .add(/about/, function() {
                    console.log('about');
                    CHAT.API.initPage('about-Page');
                })
                .add(/login/, function() {
                    CHAT.API.initPage('login-Page');
                })
                .add(/registration/, function() {
                    CHAT.API.initPage('registration-Page');
                })
                .add(/chat/, function() {
                    CHAT.API.initPage('chat-Page');
                })
                .add(/home/, function() {
                    CHAT.API.initPage('home-Page');
                })

                .add(/hui/, function() {
                    CHAT.API.initPage('home-Page');
                })
                .listen();

            Router().navigate('/home/');
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
    (function(){
        var cache = {};

        window.tmpl = function tmpl(str, data){
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                    tmpl(document.getElementById(str).innerHTML) :
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){p.push('" +
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

            return data ? fn( data ) : fn;
        };
    })();

    CHAT.API.initApp(CHAT.API.servicesList.router);
}

setTimeout(innit, 3000);
