var React = require('react');
var LineChart = require("react-chartjs").Line;

var CommitsLineChart = React.createClass({

    propTypes: {
        translations: React.PropTypes.object,
        committers: React.PropTypes.array,
        commits: React.PropTypes.array
    },
    render: function () {
        "use strict";
        return <LineChart
            data={this._getChartData(this.props.translations.REPOSITORY_NAVIGATOR_ANALYTICS_FUTURE_COMMIT_CHART_TITLE)}
            width="500" height="300" redraw />
    },

    _getLabels: function () {
        "use strict";
        return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    },

    _getData: function () {
        var dates = [];
        var pas = (Date.parse(this.props.commits[0].commit.committer.date) - Date.parse(this.props.commits[this.props.commits.length - 1].commit.committer.date)) / 10;
        var olderDate = Date.parse(this.props.commits[this.props.commits.length - 1].commit.committer.date);
        for (var i = 0; i <= 10; i++) {
            dates.push(olderDate);
            olderDate += pas;
        }

        var commitCounter = {};
        dates.map(function(date) {
                "use strict";
            commitCounter[date] = {nbCommit: 0};
        });
        var commits = this.props.commits;
        var lastIndexDates = dates.length - 1;
        commits.map(function (commit) {
            "use strict";
            for (var i = 0; i < dates.length - 1; i++) {
                var commitDate = Date.parse(commit.commit.committer.date);
                if (commitDate >= dates[i] && commitDate < dates[i + 1]) {
                    if (!commitCounter[dates[i]]) commitCounter[dates[i]] = {nbCommit: 0};
                    commitCounter[dates[i]].nbCommit += 1;
                    return;
                }
            }
            commitCounter[dates[lastIndexDates]].nbCommit += 1;
        });

        return $.map(commitCounter, function (counter) {
            return counter.nbCommit;
        });
    },

    _getDataset: function (dataChartName) {
        "use strict";
        return [
            {
                label: dataChartName ? dataChartName : '',
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: this._getData()
            }
        ];
    },

    _getChartData: function (dataChartName) {
        "use strict";
        var data = {
            labels: [],
            datasets: []
        };
        if (!this.props.commits.length > 0) return data;
        data.labels = this._getLabels();
        data.datasets = this._getDataset(dataChartName);
        return data;
    }
});

module.exports = CommitsLineChart;