var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var TranslationsActions = {
    loadTranslations : function () {
        AppDispatcher.dispatch({
            actionType: Constants.LOAD_TRANSLATIONS
        });
    }
};

module.exports = TranslationsActions;
