var React = require('react');

var BasicInfo = React.createClass({

    propTypes: {
        stars_counter: React.PropTypes.number,
        forks_counter: React.PropTypes.number,
        language: React.PropTypes.string

    },

    render: function () {
        "use strict";
        return (
            <div className="basic-info">
                <div className="info-content">
                    <div className="language">
                        {this.props.language}
                    </div>
                    <div className="stars">
                        <i className="glyphicon glyphicon-star"/>{this.props.stars_counter}
                    </div>
                    <div className="forks">
                        <i className="fa fa-code-fork"/>{this.props.forks_counter}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BasicInfo;