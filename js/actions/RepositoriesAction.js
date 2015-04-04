var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ErrorAction = require('./ErrorAction');

function buildQueryParams(form, filter) {
    var data = {
        q: form.description
    };
    if (filter.sort) {
        data.sort = filter.sort;
    }
    if (filter.order) {
        data.order = filter.order;
    }
    return data;
}

var RepositoriesAction = {

    submitSearch: function (form, filter) {
        "use strict";

        //getData from github api with searchData
        var githubApiPath = "https://api.github.com";
        var baseSearchPath = githubApiPath + "/search/repositories";
        var data = buildQueryParams(form, filter);
        $.ajax({
            url: baseSearchPath,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: data
        })
            .done(function (data, textStatus, xhr) {
                if(data.incomplete_results === true) ErrorAction.showErrorTranslation("ERROR_INCOMPLETE_RESULTS_TITLE", "ERROR_INCOMPLETE_RESULTS_TEXT");
                AppDispatcher.dispatch({
                    actionType: Constants.SUBMIT_SEARCH,
                    data: data
                })
            })
            .fail(function (xhr, textStatus, error) {
                ErrorAction.showError(xhr.status, xhr.responseJSON.message);
            });

    }
};

module.exports = RepositoriesAction;