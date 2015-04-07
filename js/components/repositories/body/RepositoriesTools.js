var React = require('react');

var RepositoriesAction = require('../../../actions/RepositoriesAction');
var RepositoriesStore = require('../../../stores/RepositoriesStore');
var TranslationStore = require('../../../stores/TranslationStore');
var SortBox = require('./tools/SortBox');

var RepositoriesTools = React.createClass({

    propTypes: {
        translations: React.PropTypes.object,
        countRepositories: React.PropTypes.number,
        selectFilter: React.PropTypes.func,
        form: React.PropTypes.object
    },

    render: function () {
        "use strict";
        var optionsSort = [
            {
                value: {},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_BEST_MATCH
            },
            {
                value: {sort: 'stars', order: 'desc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_MOST_STARS
            },
            {
                value: {sort: 'stars', order: 'asc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_FEWEST_STARS
            },
            {
                value: {sort: 'forks', order: 'desc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_MOST_FORKS
            },
            {
                value: {sort: 'forks', order: 'asc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_FEWEST_FORKS
            },
            {
                value: {sort: 'updated', order: 'desc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_RECENTLY_UPDATED
            },
            {
                value: {sort: 'updated', order: 'asc'},
                label: this.props.translations.REPOSITORIES_LIST_TOOLS_SORT_BOX_LEAST_RECENTLY_UPDATED
            }
        ];
        return (
            <div className="repositories-tools">
                <div className="repositories-count-box">
                    {TranslationStore.interpolate(this.props.translations.REPOSITORIES_LIST_TOOLS_COUNT, {countRepositories: this.props.countRepositories})}
                </div>
                <SortBox options={optionsSort} action={this._handleSort}/>
            </div>
        );
    },

    _handleSort: function (filter) {
        "use strict";
        this.props.selectFilter(filter);
        var form = this.props.form;
        if (this.props.countRepositories > 0) RepositoriesAction.submitSearch(form, filter);

    }
});

module.exports = RepositoriesTools;