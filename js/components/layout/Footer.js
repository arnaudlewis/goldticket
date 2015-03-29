var React = require('react');

var TranslationStore = require('../../stores/TranslationStore');

function getFooterState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations()
    };
}

var Footer = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getFooterState()
        )
    },

    render: function () {
        "use strict";
        return (
            <div className='footer'>
                by Arnaud Lewis
            </div>
        )
    }
});