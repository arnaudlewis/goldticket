React = require('react');

var Committer = React.createClass({

    propTypes: {
        login: React.PropTypes.string,
        avatar_url: React.PropTypes.string,
        url: React.PropTypes.string,
        followers_url: React.PropTypes.string,
        following_url: React.PropTypes.string,
        starred_url: React.PropTypes.string,
        translations: React.PropTypes.object
    },

    render: function () {
        "use strict";
        return (
            <div className="committer">
                <div className="committer-content">
                    <div className="base-informations">
                        <div className="title">
                            <div className="title-content">
                                {this.props.login}
                            </div>
                        </div>
                        <hr />
                        <div className="description">
                            <div className="desc-content">
                                <span><a href={this.props.url}>{this.props.translations.REPOSITORY_NAVIGATOR_COMMITTERS_COMMITTER_REPOSITORY}</a></span>
                            </div>
                        </div>
                    </div>
                    <div className="agrements">
                        <img src={this.props.avatar_url}/>

                        <div className="specific-informations">
                            <span><a href={this.props.followers_url}>{this.props.translations.REPOSITORY_NAVIGATOR_COMMITTERS_COMMITTER_FOLLOWERS}</a></span>
                            <span><a href={this.props.starred_url}>{this.props.translations.REPOSITORY_NAVIGATOR_COMMITTERS_COMMITTER_STARRED}</a></span>
                            <span><a href={this.props.following_url}>{this.props.translations.REPOSITORY_NAVIGATOR_COMMITTERS_COMMITTER_FOLLOWING}</a></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Committer;