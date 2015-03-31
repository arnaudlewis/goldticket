var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TranslationsAction = require('../actions/TranslationsAction');

var AppComponent = React.createClass({

    componentWillMount: function() {
        "use strict";
        TranslationsAction.loadTranslations();
    },

    render: function () {
        "use strict";
        return (
            <RouteHandler />
        )
    }
});

module.exports = AppComponent;