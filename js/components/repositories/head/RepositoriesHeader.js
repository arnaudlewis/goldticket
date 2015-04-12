var React = require('react');
var Link = require('react-router').Link;

var Form = require('./Form');

var RepositoriesHeader = React.createClass({

    propTypes: {
        translations: React.PropTypes.object
    },

    render: function () {
        "use strict";
        return (
            <div className="repositories-header">
                <div className="title">
                    <Link to="home">{this.props.translations.REPOSITORIES_HEADER_TITLE}</Link>
                </div>
                <Form translations={this.props.translations}/>
            </div>
        )
    }
});

module.exports = RepositoriesHeader;