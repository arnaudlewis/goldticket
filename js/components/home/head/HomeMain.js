var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var TranslationStore = require('../../../stores/TranslationStore');

function getHomeState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    };
}

var HomeMain = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getHomeState()
        );
    },

    componentDidMount: function () {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
    },

    render: function () {
        "use strict";
        return (
            <div className="home-element discover-wallpaper">
                <div className="layer dark-layer">
                    <div className="main-block">
                        <div className="main-title"> {this.state.translations.HOME_MAIN_TITLE} </div>
                        <div className="main-action">
                            <Link to="repositories" className="flat-btn">{this.state.translations.HOME_MAIN_DISCOVER}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getHomeState);
    }
});

module.exports = HomeMain;