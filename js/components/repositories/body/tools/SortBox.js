var React = require('react');

var SortBox = React.createClass({
    propTypes: {
        action: React.PropTypes.func,
        options: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function () {
        "use strict";
        var options = this.props.options.map(function (option) {
            return <option value={JSON.stringify(option.value)}
                           key={JSON.stringify(option.value)}>{option.label}</option>;
        });
        return (
            <div className="sort-box">
                <select onChange={this._handleSort} className="form-control">{options}</select>
            </div>
        );
    },

    _handleSort: function (event) {
        "use strict";
        var filter = JSON.parse(event.target.value);
        this.props.action(filter);
    }
});

module.exports = SortBox;