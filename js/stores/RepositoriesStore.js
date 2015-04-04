var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var _searchData = [];
var _filter = {};
var _form = {};

var CHANGE_EVENT = 'change';
var RepositoriesStore = assign({}, EventEmitter.prototype, {

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

    getSearchData: function() {
        "use strict";
        return _searchData;
    },

    getCountRepositories: function() {
        "use strict";
        return _searchData.total_count === undefined ? 0 : _searchData.total_count;
    },

    selectFilter: function(filter) {
        "use strict";
        _filter = filter;
    },

    getFilter: function() {
        "use strict";
        return _filter;
    },

    getForm: function() {
        "use strict";
        return _form;
    },

    updateFormField: function(fieldName, value) {
        "use strict";
        _form[fieldName] = value;
    }

});

AppDispatcher.register(function(payload) {
    "use strict";
    var action = payload;
    switch(action.actionType) {
        case Constants.SUBMIT_SEARCH :
            _searchData = action.data;
            break;
    }

    RepositoriesStore.emitChange();

    return true;
});

module.exports = RepositoriesStore;