var React = require('react');

var RepositoriesHeader = require('./head/RepositoriesHeader');
var RepositoriesTools = require('./body/RepositoriesTools');
var RepositoriesTableList = require('./body/RepositoriesTableList');
var TranslationStore = require('../../stores/TranslationStore');
var RepositoriesStore = require('../../stores/RepositoriesStore');

function getRepositoriesComponentState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations(),
        repositories: RepositoriesStore.getRepositoriesPerPage(),
        currentPage: RepositoriesStore.getCurrentPage(),
        hasMorePage: RepositoriesStore.hasMorePage(),
        numberOfPages: RepositoriesStore.numberOfPages(),
        countRepositories: RepositoriesStore.getCountRepositories(),
        form: RepositoriesStore.getForm(),
        filter: RepositoriesStore.getFilter(),
        selectFilter: RepositoriesStore.selectFilter
    }
}

var RepositoriesComponent = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getRepositoriesComponentState()
        )
    },

    componentDidMount: function () {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
        RepositoriesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
        RepositoriesStore.removeChangeListener(this._onChange);
    },

    render: function () {
        "use strict";
        return (
            <div className="repositories-component">
                <RepositoriesHeader
                    translations={this.state.translations}
                    />
                <RepositoriesTools
                    translations={this.state.translations}
                    countRepositories={this.state.countRepositories}
                    selectFilter={this.state.selectFilter}
                    form={this.state.form}/>
                <RepositoriesTableList
                    repositories={this.state.repositories}
                    countRepositories={this.state.countRepositories}
                    currentPage={this.state.currentPage}
                    hasMorePage={this.state.hasMorePage}
                    numberOfPages={this.state.numberOfPages}
                    form={this.state.form}
                    filter={this.state.filter}
                    translations={this.state.translations}/>
            </div>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getRepositoriesComponentState())
    }
});

module.exports = RepositoriesComponent;