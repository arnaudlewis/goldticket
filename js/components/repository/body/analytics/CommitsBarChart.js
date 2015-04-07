var React = require('react');
var BarChart = require("react-chartjs").Bar;

var CommitsBarChart = React.createClass({

    propTypes: {
        translations: React.PropTypes.object.isRequired,
        committers: React.PropTypes.array.isRequired,
        commits: React.PropTypes.array.isRequired
    },
    render: function () {
        "use strict";
        return (
            <div className="graph-container">
                <div
                    className="title">{this.props.translations.REPOSITORY_NAVIGATOR_ANALYTICS_PAST_COMMIT_CHART_TITLE}</div>
                <BarChart
                    data={this._getChartData()}
                    width="1000" height="500" redraw/>
            </div>
        );
    },

    _getLabels: function () {
        "use strict";
        var labels = [];
        this.props.committers.map(function (committer) {
            labels.push(committer.login);
        });
        return labels;
    },

    _generateCounters: function () {
        "use strict";
        var counters = {};
        this.props.committers.map(function (committer) {
            counters[committer.login] = 0;
        });
        this.props.commits.map(function (commit) {
            if (commit.committer) counters[commit.committer.login] = counters[commit.committer.login] + 1;
        });
        return $.map(counters, function (counter) {
            return counter;
        });
    },

    _getDataset: function () {
        "use strict";
        return [
            {
                label: '',
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: this._generateCounters()
            }
        ];
    },

    _getChartData: function () {
        "use strict";
        var data = {
            labels: [],
            datasets: [{}]
        };
        if (!this.props.commits.length > 0) return data;
        data.labels = this._getLabels();
        data.datasets = this._getDataset();
        return data;
    }
});

module.exports = CommitsBarChart;