var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');

var _translations = {};

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
        this.removeListener(CHANGE_EVENT, callback);
    },

    getTranslations: function () {
        "use strict";
        return _translations;
    }
});

TranslationStore.dispatchToken = Dispatcher.register(function (payload) {
    "use strict";
    var action = payload;
    switch (action.actionType) {
        case Constants.LOAD_TRANSLATIONS :
            _translations = action.data;
            break;
    }
    TranslationStore.emitChange();

    return true;
});

module.exports = TranslationStore;