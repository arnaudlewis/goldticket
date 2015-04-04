var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TranslationsAction = require('../actions/TranslationsAction');
var ErrorRenderer = require('../components/error/ErrorRenderer');

var AppComponent = React.createClass({

    componentWillMount: function () {
        "use strict";
        TranslationsAction.loadTranslations();
    },

    render: function () {
        "use strict";
        return (
            <div>
                <ErrorRenderer />
                <RouteHandler />
            </div>
        )
    }
});

module.exports = AppComponent;