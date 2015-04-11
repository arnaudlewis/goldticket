var React = require('react');
var Router = require('react-router');

var ErrorStore = require('../../stores/ErrorStore');
var ErrorCode = require('../../constants/GithubApiConstants').ERROR_CODE;

function getErrorState() {
    "use strict";
    return {
        error: ErrorStore.getError()
    }
}
var ErrorRenderer = React.createClass({

    mixins : [Router.Navigation],

    getInitialState: function () {
        "use strict";
        return (
            getErrorState()
        )
    },

    componentDidMount: function () {
        "use strict";
        ErrorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        ErrorStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        "use strict";
        this.setState(getErrorState);
        this.showError();
        if(this.state.error.code === ErrorCode.EMPTY_REPOSITORY_STATUS) this.transitionTo('repositories');
    },

    render: function () {
        "use strict";
        return (
            <div id="windowAlert" className="alert">
                <span>{this.state.error.code}</span>
                <hr/>
                <span id="alertMessage">
                    {this.state.error.message}
                </span>
            </div>
        );
    },

    showError: function () {
        "use strict";
        var alert = $("#windowAlert");
        alert.fadeIn();
        setTimeout(function () {
            alert.fadeOut();
        }, 3000);
    }
});

module.exports = ErrorRenderer;