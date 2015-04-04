var React = require('react');

var RepositoriesAction = require('../../../actions/RepositoriesAction');
var RepositoriesStore = require('../../../stores/RepositoriesStore');
var TranslationStore = require('../../../stores/TranslationStore');
var SortBox = require('./SortBox');

var optionsSort = [
    {value: 'order=desc'},
    {value: 'sort=stars&order=desc'},
    {value: 'sort=stars&order=asc'},
    {value: 'sort=forks&order=desc'},
    {value: 'sort=forks&order=asc'},
    {value: 'sort=updated&order=desc'},
    {value: 'sort=updated&order=asc'}
];

function getRepositoriesToolsState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations(),
        countRepositories: RepositoriesStore.getCountRepositories()
    }
}

var RepositoriesTools = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getRepositoriesToolsState()
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
        var optionsSort = [
            {
                value: {},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_BEST_MATCH},
            {
                value: {sort: 'stars', order:'desc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_MOST_STARS
            },
            {
                value: {sort: 'stars', order:'asc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_FEWEST_STARS
            },
            {
                value: {sort: 'forks', order:'desc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_MOST_FORKS
            },
            {
                value: {sort: 'forks', order:'asc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_FEWEST_FORKS
            },
            {
                value: {sort: 'updated', order:'desc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_RECENTLY_UPDATED
            },
            {
                value: {sort: 'updated', order:'asc'},
                label: this.state.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_LEAST_RECENTLY_UPDATED
            }
        ];
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="repositories-tools">
                        <div className="repositories-count-box">
                            {TranslationStore.interpolate(this.state.translations.REPOSITORIES_LIST_TOOLS_COUNT, {countRepositories: this.state.countRepositories})}
                        </div>
                        <SortBox options={optionsSort} action={this._handleSort}/>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getRepositoriesToolsState);
    },

    _handleSort: function (filter) {
        "use strict";
        RepositoriesStore.selectFilter(filter);
        var form = RepositoriesStore.getForm();
        if(RepositoriesStore.getCountRepositories() > 0) RepositoriesAction.submitSearch(form, filter);

    }
});

module.exports = RepositoriesTools;