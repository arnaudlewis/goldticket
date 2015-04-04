var React = require('react');

var Repository = React.createClass({

    propTypes: {
        fullname: React.PropTypes.string.isRequired,
        img_url: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        language: React.PropTypes.string.isRequired,
        stargazers_count: React.PropTypes.number.isRequired,
        forks_count: React.PropTypes.number.isRequired
    },

    render: function () {
        "use strict";
        return (
            <div className="repository">
                <div className="base-informations">
                    <div className="title">{this.props.fullname}</div>
                    <div className="description">{this.props.description}</div>
                </div>
                <div className="agrements">
                    <img src={this.props.img_url}/>

                    <div classsName="specific-informations">
                        {this.props.language}
                        {this.props.stargazers_count}
                        {this.props.forks_count}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Repository;