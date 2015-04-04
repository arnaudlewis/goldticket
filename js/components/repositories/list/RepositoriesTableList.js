var React = require('react');

var RepositoriesStore = require('../../../stores/RepositoriesStore');
var Repository = require('./Repository');

function getRepositoriesTableListState() {
    "use strict";
    return {
        repositories: RepositoriesStore.getRepositories()
    }
}

var RepositoriesTableList = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getRepositoriesTableListState()
        )
    },

    componentDidMount: function () {
        "use strict";
        RepositoriesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        RepositoriesStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        "use strict";
        this.setState(getRepositoriesTableListState);
    },

    render: function () {
        "use strict";
        var repositories = this.state.repositories.map(function (repository) {
            return <Repository
                fullname={repository.full_name}
                img_url={repository.owner.avatar_url}
                description={repository.description}
                language={repository.language}
                stargazers_count={repository.stargazers_count}
                forks_count={repository.forks_count}/>;
        });
        return (
            <div className="repositories-table-list">
                {repositories}
            </div>
        )
    }
});

module.exports = RepositoriesTableList;