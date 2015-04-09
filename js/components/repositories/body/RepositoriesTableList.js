var React = require('react');

var Repository = require('./Repository');
var RepositoriesAction = require('../../../actions/RepositoriesAction');
var Paginator = require('./tools/Paginator');
var RepositoriesStore = require('../../../stores/RepositoriesStore');

var RepositoriesTableList = React.createClass({

    propTypes: {
        repositories: React.PropTypes.array,
        currentPage: React.PropTypes.number,
        hasMorePage: React.PropTypes.bool,
        countRepositories: React.PropTypes.number,
        numberOfPages: React.PropTypes.number,
        form: React.PropTypes.object,
        filter: React.PropTypes.object,
        translations: React.PropTypes.object

    },

    render: function () {
        "use strict";
        var countRepositories = this.props.countRepositories;
        var repositories = this.props.repositories.map(function (repository) {
            return <Repository
                key={repository.id}
                repositoryName={repository.name}
                ownerName={repository.owner.login}
                fullname={repository.full_name}
                img_url={repository.owner.avatar_url}
                description={repository.description}
                language={repository.language}
                stargazers_count={repository.stargazers_count}
                forks_count={repository.forks_count}/>;
        });
        return (
            <div>
                <div className="repositories-table-list">
                    {repositories}
                </div>
                <Paginator currentPage={this.props.currentPage}
                           hasMore={this.props.hasMorePage}
                           loadMore={this._changePage}
                           countRepositories={countRepositories}
                           numberOfPages={this.props.numberOfPages}
                           translations={this.props.translations}
                    />
            </div>
        )
    },

    _changePage: function (page) {
        "use strict";
        var form = this.props.form;
        var filter = this.props.filter;
        RepositoriesAction.loadFromCache(form, filter, page);
    }
});

module.exports = RepositoriesTableList;