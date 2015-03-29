var React = require('react');

var TranslationStore = require('../../stores/TranslationStore');

function getRepositoriesState() {
    "use strict";
    return {
        translations : TranslationStore.getTranslations()
    }
}

var RepositoriesComponent = React.createClass({

    getInitialState: function() {
        "use strict";
       return getRepositoriesState();
    },

    render: function() {
        "use strict";
        return(
            <div> Repositories </div>
        );
    }
});

module.exports = RepositoriesComponent;