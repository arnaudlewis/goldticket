React = require('react');

var CommitterPane = require('./CommittersPane');
var AnalyticsPane = require('./AnalyticsPane');

var RepositoryContainer = React.createClass({

    propTypes: {
        translations: React.PropTypes.object,
        committers: React.PropTypes.array,
        commits: React.PropTypes.array
    },

    render: function () {
        "use strict";
        return (
            <div className="repository-container">
                <CommitterPane translations={this.props.translations} committers={this.props.committers}/>
                <AnalyticsPane translations={this.props.translations} commits={this.props.commits}
                               committers={this.props.committers}/>
            </div>
        );
    }
});

module.exports = RepositoryContainer;