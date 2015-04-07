var React = require('react');

var TranslationStore = require('../../stores/TranslationStore');
var RepositoryStore = require('../../stores/RepositoryStore');
var RepositoryAction = require('../../actions/RepositoryAction');
var RepositoryHeader = require('./head/RepositoryHeader');
var RepositoryNavigator = require('./body/RepositoryContainer');

var RepositoryComponent = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        "use strict";
        return {
            translations: TranslationStore.getTranslations(),
            repository: RepositoryStore.getRepositoryByName(this.context.router.getCurrentParams().ownerName, this.context.router.getCurrentParams().repositoryName),
            getCommitters: RepositoryStore.getCommitters,
            getCommits: RepositoryStore.getCommits
        }
    },

    componentWillMount: function () {
        "use strict";
        RepositoryAction.loadRepositoryByName(this.context.router.getCurrentParams().ownerName, this.context.router.getCurrentParams().repositoryName);
    },

    componentDidMount: function () {
        "use strict";
        RepositoryStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        RepositoryStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        "use strict";
        this.setState(this.getInitialState);
    },

    _getOwnerLogin: function() {
        "use strict";
        return this.state.repository
            ? this.state.repository.owner ? this.state.repository.owner.login : ''
            : '';
    },

    render: function () {
        "use strict";
        return (
            <div className="repository-component">
                <RepositoryHeader
                    ownerLogin={this._getOwnerLogin()}
                    repositoryName={this.state.repository.name}
                    stars_counter={this.state.repository.stargazers_count}
                    forks_counter={this.state.repository.forks_count}
                    language={this.state.repository.language}/>

                <RepositoryNavigator
                    translations={this.state.translations}
                    committers={this.state.getCommitters(this.context.router.getCurrentParams().ownerName, this.context.router.getCurrentParams().repositoryName)}
                    commits={this.state.getCommits(this.context.router.getCurrentParams().ownerName, this.context.router.getCurrentParams().repositoryName)}/>
            </div>

        )
    }
});

module.exports = RepositoryComponent;