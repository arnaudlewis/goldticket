var EventEmitter = require('events').EventEmitter;

var Constants = require('../constants/Constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');

var _translationsFromServer = {
    test: 'test',
    test2: 'test2'
};


var _translations = {};

function _loadTranslations() {
    "use strict";
    _translations = _translationsFromServer;
}

var CHANGE_EVENT = 'change';

var TranslationStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        "use strict";
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        "use strict";
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        "use strict";
        this.removeChangeListener(CHANGE_EVENT, callback);
    },

    getTranslations: function () {
        "use strict";
        return _translations;
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        "use strict";
        var action = payload;
        switch (action.actionType) {
            case Constants.LOAD_TRANSLATIONS :
                _loadTranslations();
                break;
        }
        TranslationStore.emitChange();

        return true;
    })
});
module.exports = TranslationStore;