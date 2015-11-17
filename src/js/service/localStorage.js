CHAT.servicesFunctionality.services('storage' , function () {
    console.info("Start work storage");
    return {
        push: function (key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    console.log('Локальное хранилище переполнено');
                }
            }
        },
        get: function (key) {
            localStorage.getItem(key);
        },
        clear: function (key) {
            localStorage.removeItem(key);
        },
        clearAll: function () {
            localStorage.clear();
            console.log('clear all storage');
        }
    }
});