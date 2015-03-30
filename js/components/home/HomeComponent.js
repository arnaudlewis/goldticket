var React = require('react');

var HomeMain = require('./HomeMain');
var HomeElementLeft = require('./HomeElementLeft');
var HomeElementRight = require('./HomeElementRight');
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
            <div>
                <HomeMain />

                <HomeElementRight className="layer light-layer"
                             backgroundImgClass="element-wallpaper-light"
                             elementTitle={this.state.translations.HOME_ELEMENT_REPOSITORIES_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_REPOSITORIES_TEXT}
                             elementImgUrl="img/components/home/discover-wallpaper.jpg"/>

                <HomeElementLeft className="layer dark-layer"
                             backgroundImgClass="element-wallpaper-dark"
                             elementTitle={this.state.translations.HOME_ELEMENT_REPOSITORY_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_REPOSITORY_TEXT}
                             elementImgUrl="img/components/home/discover-wallpaper.jpg"/>

                <HomeElementRight className="layer light-layer"
                             backgroundImgClass="element-wallpaper-light"
                             elementTitle={this.state.translations.HOME_ELEMENT_ANALYTICS_TITLE}
                             elementText={this.state.translations.HOME_ELEMENT_ANALYTICS_TEXT}
                             elementImgUrl="img/components/home/discover-wallpaper.jpg"/>
            </div>
        );
    },

    _onChange: function () {
        "use strict";
        this.setState(getHomeState);
    }
});

module.exports = HomeComponent;