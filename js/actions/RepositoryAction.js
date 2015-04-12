var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ErrorAction = require('./ErrorAction');
var ApiConst = require('../constants/GithubApiConstants');
var BrowseConst = ApiConst.BROWSE_CONSTANTS;

var commitsCounter = 0;

function buildResponse(repository, commits, committers) {
    "use strict";
    var data = repository;
    data.commits = commits;
    data.committers = committers;
    commitsCounter += commits.length;
    return data;
}

var RepositoryAction = {

    loadRepositoryByName: function (ownerName, repositoryName) {
        "use strict";
        commitsCounter = 0;
        var repoPath = BrowseConst.GITHUB_API_PATH + '/repos/' + ownerName + '/' + repositoryName;
        var commitsPath = repoPath + '/commits';
        var committersPath = repoPath + '/contributors';
        $.when(
            $.ajax({
                url: repoPath,
                type: 'GET',
                contentType: 'application/json; charset=utf-8'
            }),

            $.ajax({
                url: commitsPath,
                type: 'GET',
                data: {per_page: BrowseConst.COMMITS_MAX},
                contentType: 'application/json; charset=utf-8'
            }),

            $.ajax({
                url: committersPath,
                type: 'GET',
                contentType: 'application/json; charset=utf-8'
            })
        )

            .done(function (repoCallback, commitsCallback, committersCallback) {
                var repository = buildResponse(repoCallback[0], commitsCallback[0], committersCallback[0]);
                AppDispatcher.dispatch({
                    actionType: Constants.LOAD_REPOSITORY_BY_NAME,
                    data: repository
                });
            })
            .fail(function (xhr, textStatus, error) {
                ErrorAction.showError(xhr.status, xhr.responseJSON.message);
            });
    }
};

module.exports = RepositoryAction;