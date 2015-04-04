var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ErrorAction = {

    showError: function(code, message) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: Constants.SHOW_ERROR,
            data: {code: code, message: message}
        });
    },

    showErrorTranslation: function(title, text) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: Constants.SHOW_ERROR_TRANSLATION,
            data: {code: title, message: text}
        });
    }
};

module.exports = ErrorAction;