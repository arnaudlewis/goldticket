var React = require('react')

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
        return getHomeState();
    },

    render: function () {
        "use strict";
        return (
            <div> hello world {this.state.translations.test} </div>
        );
    }
});

module.exports = HomeComponent;