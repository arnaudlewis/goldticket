var React = require('react');

var HomeMain = require('./head/HomeMain');
var HomeElementLeft = require('./body/HomeElementLeft');
var HomeElementRight = require('./body/HomeElementRight');
var TranslationStore = require('../../stores/TranslationStore');

function getHomeState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    };
}
var HomeComponent = React.createClass({

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
            <div className="home-component">
                <HomeMain />

                <HomeElementRight className="layer light-layer"
                             backgroundImgClass="element-wallpaper-light"
                             elementTitle={this.state.translations.HOME_ELEMENT_REPOSITORIES_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_REPOSITORIES_TEXT}
                             elementImgUrl="img/components/home/repositories.png"/>

                <HomeElementLeft className="layer dark-layer"
                             backgroundImgClass="element-wallpaper-dark"
                             elementTitle={this.state.translations.HOME_ELEMENT_REPOSITORY_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_REPOSITORY_TEXT}
                             elementImgUrl="img/components/home/repository.png"/>

                <HomeElementRight className="layer light-layer"
                             backgroundImgClass="element-wallpaper-light"
                             elementTitle={this.state.translations.HOME_ELEMENT_ANALYTICS_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_ANALYTICS_TEXT}
                             elementImgUrl="img/components/home/analytics.png"/>
            </div>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getHomeState);
    }
});

module.exports = HomeComponent;