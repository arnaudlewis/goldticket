var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TranslationStore = require('../stores/TranslationStore');
var TranslationAction = require('../actions/TranslationAction');

function getAppState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    };
}

var AppComponent = React.createClass({

    getInitialState: function () {
        "use strict";
        return getAppState();
    },

    componentDidMount: function() {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
        TranslationAction.loadTranslations();
    },

    componentWillUnmount: function() {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
    },

    render: function () {
        "use strict";
        return (
            <RouteHandler />
        )
    },

    _onChange: function() {
        "use strict";
        this.setState(getAppState());
    }
});

module.exports = AppComponent;