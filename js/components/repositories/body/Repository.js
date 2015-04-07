var React = require('react');
var Link = require('react-router').Link;

var Repository = React.createClass({

    propTypes: {
        repositoryName: React.PropTypes.string,
        ownerName: React.PropTypes.string,
        fullname: React.PropTypes.string,
        img_url: React.PropTypes.string,
        description: React.PropTypes.string,
        language: React.PropTypes.string,
        stargazers_count: React.PropTypes.number,
        forks_count: React.PropTypes.number
    },

    render: function () {
        "use strict";
        return (
            <div className="repository">
                <Link to="repository" params={{repositoryName: this.props.repositoryName, ownerName: this.props.ownerName}}>
                    <div className="repository-content">
                        <div className="base-informations">
                            <div className="title">
                                <div className="title-content">
                                    {this.props.fullname}
                                </div>
                            </div>
                            <hr />
                            <div className="description">
                                <div className="desc-content">
                                    {this.props.description}
                                </div>
                            </div>
                        </div>
                        <div className="agrements">
                            <img src={this.props.img_url}/>

                            <div className="specific-informations">
                                <span>{this.props.language}</span>
                                <span><i className="glyphicon glyphicon-star"/>{this.props.stargazers_count}</span>
                                <span><i className="fa fa-code-fork"/>{this.props.forks_count}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
});

module.exports = Repository;