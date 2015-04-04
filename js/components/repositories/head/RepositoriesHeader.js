var React = require('react');

var TranslationStore = require('../../../stores/TranslationStore');
var Form = require('./Form');

function getRepositoriesHeaderState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    }
}

var RepositoriesHeader = React.createClass({

    getInitialState: function() {
        "use strict";
        return (
            getRepositoriesHeaderState()
        )
    },

    componentDidMount: function() {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
    },

    render: function () {
        "use strict";
        return (
            <div className="repositories-header">
                <div className="title">
                    {this.state.translations.REPOSITORIES_HEADER_TITLE}
                </div>
                <Form />
            </div>
        )
    },

    _onChange: function() {
        "use strict";
        this.setState(getRepositoriesHeaderState);
    }
});

module.exports = RepositoriesHeader;