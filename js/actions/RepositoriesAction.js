var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ErrorAction = require('./ErrorAction');
var ApiConstants = require('../constants/GithubApiConstants');
var BrowseConst = ApiConstants.BROWSE_CONSTANTS;
var ErrorCode = ApiConstants.ERROR_CODE;

function insertSeparator(separator, query) {
    "use strict";
    if (query !== '') return query + separator;
    else return query;
}

function insertDataParam(dataQuery, formParam, identifier) {
    "use strict";
    if (formParam) {
        dataQuery = insertSeparator(BrowseConst.SEPARATOR, dataQuery);
        if (identifier) return dataQuery + identifier + ':' + formParam;
        else return dataQuery + formParam;
    } else {
        return dataQuery;
    }
}

function buildDataForm(form) {
    var dataQueryString = '';

    dataQueryString = insertDataParam(dataQueryString, form.description);
    dataQueryString = insertDataParam(dataQueryString, form.language, 'language');
    dataQueryString = insertDataParam(dataQueryString, form.user, 'user');

    return dataQueryString;
}
function buildQueryParams(form, filter, page) {
    var data = {q: buildDataForm(form)};
    if (filter.sort) {
        data.sort = filter.sort;
    }
    if (filter.order) {
        data.order = filter.order;
    }
    if (page) {
        data.page = page
    } else {
        data.page = 1;
    }
    data.per_page = BrowseConst.PER_PAGE;
    return data;
}

function showErrorNoResult() {
    "use strict";
    ErrorAction.showErrorTranslation("ERROR_NO_RESULT_TITLE", "ERROR_NO_RESULT_TEXT");
}

var RepositoriesAction = {

    submitSearch: function (form, filter, page) {
        "use strict";
        this.emptyCachedRepositories();
        AppDispatcher.dispatch({
            actionType: Constants.RESET_SEARCH_CACHE
        });
        this.loadNewPageFromApi(form, filter, page);
    },

    emptyCachedRepositories: function () {
        "use strict";
        sessionStorage.removeItem('RepositoriesStore');
    },

    loadNewPageFromApi: function (form, filter, page) {
        "use strict";
        var baseSearchPath = BrowseConst.GITHUB_API_PATH + "/search/repositories";
        var data = buildQueryParams(form, filter, page);
        $.ajax({
            url: baseSearchPath,
            type: 'GET',
            page: data.page,
            contentType: 'application/json; charset=utf-8',
            data: data
        })
            .done(function (data, textStatus, xhr) {
                if (data.total_count === 0) showErrorNoResult();
                if (data.incomplete_results === true) ErrorAction.showErrorTranslation("ERROR_INCOMPLETE_RESULTS_TITLE", "ERROR_INCOMPLETE_RESULTS_TEXT");
                AppDispatcher.dispatch({
                    actionType: Constants.SUBMIT_SEARCH,
                    data: {searchData: data, page: this.page, perPage: BrowseConst.PER_PAGE, maxResults: BrowseConst.MAX_RESULTS}
                })
            })
            .error(function (xhr, textStatus, error) {
                if(xhr.status === ErrorCode.WRONG_REPOSITORY_SEARCH_STATUS) showErrorNoResult();
                else ErrorAction.showError(xhr.status, xhr.responseJSON.message);
            });
    },

    loadFromCache: function (form, filter, page) {
        "use strict";
        var repo = JSON.parse(sessionStorage.RepositoriesStore);
        if (repo.searchData[page]) {
            AppDispatcher.dispatch({
                actionType: Constants.LOAD_CACHE_REPOSITORIES,
                data: {page: page}
            });
        } else {
            this.loadNewPageFromApi(form, filter, page);
        }
    }
};

module.exports = RepositoriesAction;