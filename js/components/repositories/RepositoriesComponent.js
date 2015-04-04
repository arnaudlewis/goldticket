var React = require('react');

var RepositoriesHeader = require('./head/RepositoriesHeader');
var RepositoriesTools = require('./list/RepositoriesTools');

var RepositoriesComponent = React.createClass({

    render: function() {
        "use strict";
        return(
            <div className="repositories-component">
                <RepositoriesHeader />
                <RepositoriesTools />
            </div>
        );
    }
});

module.exports = RepositoriesComponent;