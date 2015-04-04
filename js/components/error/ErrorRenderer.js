var React = require('react');

var ErrorStore = require('../../stores/ErrorStore');

function getErrorState() {
    "use strict";
    return {
        error: ErrorStore.getError()
    }
}
var ErrorRenderer = React.createClass({

    getInitialState: function() {
        "use strict";
        return (
            getErrorState()
        )
    },

    componentDidMount: function() {
        "use strict";
        ErrorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        "use strict";
        ErrorStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        "use strict";
        this.setState(getErrorState);
        if(this.state.error.code) this.showError();
    },

    render: function () {
        "use strict";
        return (
            <div id="windowAlert" className="alert">
                <span>Error : {this.state.error.code}</span>
                <hr/>
                <span id="alertMessage">
                    {this.state.error.message}
                </span>
            </div>
        );
    },

    showError: function() {
        "use strict";
        var alert = $("#windowAlert");
        alert.fadeIn();
        setTimeout(function () {
            alert.fadeOut();
        }, 3000);
    }
});

module.exports = ErrorRenderer;