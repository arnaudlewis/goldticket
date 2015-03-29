var React = require('react');

var TranslationStore = require('../../stores/TranslationStore');


function getRepositoryState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    };
}

var RepositoryComponent = React.createClass({

    getInitialState: function () {
        "use strict";
        return getRepositoryState();
    },

    render: function () {
        "use strict";

    }
});

module.exports = RepositoryComponent;