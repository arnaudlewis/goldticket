var React = require('react');
var CommitsBarChart = require('./analytics/CommitsBarChart');
var CommitsLineChart = require('./analytics/CommitsLineChart');

var AnalyticsPane = React.createClass({

    propTypes: {
        translations: React.PropTypes.object,
        committers: React.PropTypes.array,
        commits: React.PropTypes.array
    },
    render: function () {
        "use strict";
        return (
            <div>
                <CommitsBarChart translations={this.props.translations} committers={this.props.committers}
                                 commits={this.props.commits}/>
                <CommitsLineChart translations={this.props.translations} committers={this.props.committers}
                                  commits={this.props.commits}/>
            </div>
        );
    }
});

module.exports = AnalyticsPane;