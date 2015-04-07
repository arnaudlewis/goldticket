var React = require('react');

var Committer = require('./Committer');

const githubUrl = 'https://github.com/';

var CommitterPane = React.createClass({

    propTypes: {
        translations: React.PropTypes.object,
        committers: React.PropTypes.array
    },

    render: function () {
        "use strict";
        var translations = this.props.translations;
        var committers = this.props.committers.map(function (committer) {
            var committerUrl = githubUrl + committer.login;
            var starredUrl = githubUrl + 'stars/' + committer.login;
            var followersUrl = committerUrl + '/followers';
            var followingUrl = committerUrl + '/following';
            return (
                <Committer
                    key={committer.id}
                    login={committer.login}
                    avatar_url={committer.avatar_url}
                    url={committerUrl}
                    followers_url={followersUrl}
                    following_url={followingUrl}
                    starred_url={starredUrl}
                    translations={translations}/>
            )
        });
        return (
            <div className="committers-table-list">
                {committers}
            </div>
        )
    }
});

module.exports = CommitterPane;