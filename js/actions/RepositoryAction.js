var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ErrorAction = require('./ErrorAction');

const COMMITS_MAX = 100;
const githubApiPath = "https://api.github.com";

var commitsCounter = 0;

function buildCommitterList(commits) {
    var committerList = {};
    commits.forEach(function (commit) {
        if (commit.committer && !committerList[commit.committer.id]) {
            committerList[commit.committer.id] = commit.committer;
        }
    });
    return $.map(committerList, function (committer) {
        return committer;
    });
}

function buildResponse(repository, commits) {
    "use strict";
    var data = repository;
    data.committers = buildCommitterList(commits);
    data.commits = commits;
    commitsCounter += commits.length;
    return data;
}

var RepositoryAction = {

    loadRepositoryByName: function (ownerName, repositoryName) {
        "use strict";
        commitsCounter = 0;
        var repoPath = githubApiPath + '/repos/' + ownerName + '/' + repositoryName;
        var commitsPath = repoPath + '/commits';
        $.when(
            $.ajax({
                url: repoPath,
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("arnaudlewis:Xps2.100silver"));
                },
                contentType: 'application/json; charset=utf-8'
            }),

            $.ajax({
                url: commitsPath,
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("arnaudlewis:Xps2.100silver"));
                },
                data: {per_page: COMMITS_MAX},
                contentType: 'application/json; charset=utf-8'
            })
        )

            .done(function (repoCallback, commitsCallback) {
                var repository = buildResponse(repoCallback[0], commitsCallback[0]);
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