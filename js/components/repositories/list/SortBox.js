var React = require('react');

var TranslationStore = require('../../../stores/TranslationStore');
var RepositoriesStore = require('../../../stores/RepositoriesStore');

function getSortBoxState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    }
}

var SortBox = React.createClass({
    propTypes: {
        action: React.PropTypes.func.isRequired,
        options: React.PropTypes.arrayOf(React.PropTypes.object.isRequired)
    },

    getInitialState: function () {
        "use strict";
        return (
            getSortBoxState()
        )
    },

    componentDidMount: function () {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
    },

    render: function () {
        "use strict";
        var options = this.props.options.map(function (option) {
            return <option value={JSON.stringify(option.value)}>{option.label}</option>;
        });
        return(
            <select onChange={this._handleSort} className="form-control">{options}</select>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getSortBoxState);
    },

    _handleSort: function (event) {
        "use strict";
        var filter = JSON.parse(event.target.value);
        this.props.action(filter);
    }
});

module.exports = SortBox;