CHAT.servicesFunctionality.services('urlData', function() {

    function allData () {
        return location;
    }
    function search () {
        var search = new Object() ,
            searchData = location.search ? location.search.slice(1).split('&') : undefined ,
            createSearchObject = function (value) {
                "use strict";

                if (value == undefined) return false;

                value.forEach(function (item , i ,arr) {
                    if(arr.length < 1) return false;
                    search[item.split('=')[0]] = item.split('=')[1];
                });
            };

        createSearchObject(searchData);
        return search;
    }


    return {
        allData: allData(),
        search: search()
    }
});