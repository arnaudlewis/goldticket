var React = require('react');
var Link = require('react-router').Link;

var BasicInfo = require('./BasicInfo');

var RepositoryHeader = React.createClass({

    propTypes: {
        ownerLogin: React.PropTypes.string,
        repositoryName: React.PropTypes.string,
        stars_counter: React.PropTypes.number,
        forks_counter: React.PropTypes.number,
        language: React.PropTypes.string
    },

    render: function () {
        "use strict";
        return (
            <div className="repository-header">
                <div className="navigation-back"><Link to="repositories"><i className="fa fa-arrow-circle-o-left"></i></Link></div>
                <div className="title">
                    {this.props.ownerLogin? this.props.ownerLogin + ' /' : ''} {this.props.repositoryName}
                </div>
                <BasicInfo stars_counter={this.props.stars_counter} forks_counter={this.props.forks_counter} language={this.props.language}/>
            </div>
        )
    }
});

module.exports = RepositoryHeader;