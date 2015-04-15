var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var _PER_PAGE;
var _MAX_RESULTS;

var _searchData = {};
var _filter = {};
var _form = {};
var _page = 0;
var _validForm = {};

if (sessionStorage.RepositoriesStore) {
    repo = JSON.parse(sessionStorage.RepositoriesStore);
    _validform = repo.validForm;
    _searchData = repo.searchData;
    _filter = repo.filter;
    _form = repo.form;
    _page = repo.page;
    _PER_PAGE = repo.perPage;
    _MAX_RESULTS = repo.maxResults;
} else {
    sessionStorage.RepositoriesStore = JSON.stringify({
        validForm: _validForm,
        searchData: _searchData,
        filter: _filter,
        form: _form,
        page: _page,
        perPage: _PER_PAGE,
        maxResults: _MAX_RESULTS
    });
}


var CHANGE_EVENT = 'change';
var RepositoriesStore = assign({}, EventEmitter.prototype, {

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

    resetSearchData: function () {
        "use strict";
        _searchData = {};
    },

    getRepositoriesPerPage: function () {
        "use strict";
        return _searchData[_page] ? _searchData[_page] : [];
    },

    getCountRepositories: function () {
        "use strict";
        return _searchData.total_count === undefined ? 0 : _searchData.total_count;
    },

    selectFilter: function (filter) {
        "use strict";
        _filter = filter;
    },

    getFilter: function () {
        "use strict";
        return _filter;
    },

    getForm: function () {
        "use strict";
        return _validForm;
    },

    getEditableForm: function () {
        "use strict";
        return _form;
    },

    getCurrentPage: function () {
        "use strict";
        return _page;
    },

    hasMorePage: function () {
        "use strict";
        return _page * _PER_PAGE < this.getCountRepositories() && _page * _PER_PAGE < _MAX_RESULTS;
    },

    numberOfPages: function () {
        "use strict";
        return this.getCountRepositories() > _MAX_RESULTS ? parseInt(_MAX_RESULTS / _PER_PAGE) + 1 : parseInt(this.getCountRepositories() / _PER_PAGE) + 1;
    },

    updateFormField: function (fieldName, value) {
        "use strict";
        _form[fieldName] = value;
    }

});

AppDispatcher.register(function (payload) {
    "use strict";
    var action = payload;
    switch (action.actionType) {
        case Constants.SUBMIT_SEARCH :
            _page = action.data.page;
            _validForm = action.data.validForm;
            _searchData[_page] = action.data.searchData.items;
            _searchData.total_count = action.data.searchData.total_count;
            _PER_PAGE = action.data.perPage;
            _MAX_RESULTS = action.data.maxResults;
            break;

        case Constants.LOAD_CACHE_REPOSITORIES :
            _page = action.data.page;
            break;


        case Constants.RESET_SEARCH_CACHE :
            RepositoriesStore.resetSearchData();
            break;
    }

    sessionStorage.RepositoriesStore = JSON.stringify({
        searchData: _searchData,
        filter: _filter,
        form: _form,
        page: _page,
        perPage: _PER_PAGE,
        maxResults: _MAX_RESULTS,
        validform: _validForm
    });
    RepositoriesStore.emitChange();

    return true;
});

module.exports = RepositoriesStore;