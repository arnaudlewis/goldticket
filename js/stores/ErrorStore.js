var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var TranslationStore = require('./TranslationStore');

var _error = {};

var CHANGE_EVENT = 'change';
var ErrorStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        "use strict";
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        "use strict";
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        "use strict";
        this.removeListener(CHANGE_EVENT, callback);
    },

    getError: function() {
        "use strict";
        return _error;
    }
});

AppDispatcher.register(function (payload) {
    "use strict";
    var action = payload;
    switch (action.actionType) {
        case Constants.SHOW_ERROR :
            _error = action.data;
            break;

        case Constants.SHOW_ERROR_TRANSLATION :
            var translations = TranslationStore.getTranslations();
            _error = {code: translations[action.data.code], message: translations[action.data.message]} ;
            break;
    }
    ErrorStore.emitChange();
    return true;
});

module.exports = ErrorStore;