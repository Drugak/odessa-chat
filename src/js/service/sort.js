"use strict"

CHAT.servicesFunctionality.services('mySort', function() {
    Array.prototype.syperSort = function() {
        var result = [1],
            myArray = this;

        for ( var a = 0; a < myArray.length ; a++) {
            for(var b = 0; b < result.length; b++) {
                if(result[b] < myArray[a]) {
                    result.splice(b + 1 , 0, myArray[a])
                }
            }
        }
        console.log(result, 'asdasdasd');
    };

    var test =[2,1,4,3,8,7,9,0,5];

    test.syperSort();
});