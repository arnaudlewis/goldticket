var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var jQuery = require('jquery');

var TranslationsAction = {
    loadTranslations : function () {
        var browserLangCode = navigator.language.substr(0, 2) || 'en';
        var filepath = './translations/translations_' + browserLangCode + '.json';

        jQuery.getJSON(filepath, function (data) {
            AppDispatcher.dispatch({
                actionType: Constants.LOAD_TRANSLATIONS,
                data: data
            });
        });
    }
};

module.exports = TranslationsAction;
