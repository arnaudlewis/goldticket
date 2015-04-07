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
        return (
            <div className="graph-container">
                <div className="title">{this.props.translations.REPOSITORY_NAVIGATOR_ANALYTICS_FUTURE_COMMIT_CHART_TITLE}</div>
                <LineChart
                    data={this._getChartData()}
                    width="1000" height="500" redraw/>
            </div>
        );
    },

    _getFormattedDate: function (dateAsTimestamp) {
        "use strict";
        var date = new Date(dateAsTimestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + '/' + month + '/' + year;
    },

    _getLabels: function () {
        "use strict";
        var dates = this._getBatchDates();
        var labels = [];
        var formattedDateFunc = this._getFormattedDate;
        dates.map(function (date) {
            labels.push(formattedDateFunc(date));
        });
        return labels;
    },

    _getBatchDates: function () {
        "use strict";
        var dates = [];
        var pas = (Date.parse(this.props.commits[0].commit.committer.date) - Date.parse(this.props.commits[this.props.commits.length - 1].commit.committer.date)) / 10;
        var olderDate = Date.parse(this.props.commits[this.props.commits.length - 1].commit.committer.date);
        for (var i = 0; i <= 10; i++) {
            dates.push(olderDate);
            olderDate += pas;
        }
        return dates;
    },

    _initCommitCounter: function () {
        "use strict";
        var commitCounter = {};
        this._getBatchDates().map(function (date) {
            "use strict";
            commitCounter[date] = {nbCommit: 0};
        });
        return commitCounter;
    },

    _dispatchCommits: function (commitCounter, dates, lastIndexDates, commits) {
        "use strict";
        this.props.commits.map(function (commit) {
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
    },

    _getData: function () {
        var dates = this._getBatchDates();

        var commitCounter = this._initCommitCounter();
        var lastIndexDates = dates.length - 1;
        this._dispatchCommits(commitCounter, dates, lastIndexDates);
        return $.map(commitCounter, function (counter) {
            return counter.nbCommit;
        });
    },

    _getDataset: function () {
        "use strict";
        return [
            {
                label: '',
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

module.exports = CommitsLineChart;