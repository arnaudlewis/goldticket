var Constants = require('../constants/Constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _repositories = {};

var CHANGE_EVENT = 'change';
var RepositoryStore = assign({}, EventEmitter.prototype, {

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

    getRepositoryByName: function (ownerName, repositoryName) {
        "use strict";
        return _repositories[ownerName] &&  _repositories[ownerName][repositoryName] ? _repositories[ownerName][repositoryName] : {};
    },

    getCommitters: function (ownerName, repositoryName) {
        "use strict";
        return _repositories[ownerName] &&  _repositories[ownerName][repositoryName] ? _repositories[ownerName][repositoryName].committers : [];
    },

    getCommits: function (ownerName, repositoryName) {
        "use strict";
        return _repositories[ownerName] &&  _repositories[ownerName][repositoryName] ? _repositories[ownerName][repositoryName].commits : [];
    }
});

AppDispatcher.register(function (payload) {
    "use strict";

    var action = payload;
    switch (action.actionType) {
        case Constants.LOAD_REPOSITORY_BY_NAME :
            if(!_repositories[action.data.owner.login]) _repositories[action.data.owner.login] = [];
            _repositories[action.data.owner.login][action.data.name] = action.data;
            break;
    }
    RepositoryStore.emitChange();

    return true;
});

module.exports = RepositoryStore;