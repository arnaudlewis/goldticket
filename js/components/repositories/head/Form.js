var React = require('react');
var jQuery = require('jquery');

var TranslationStore = require('../../../stores/TranslationStore');
var RepositoriesStore = require('../../../stores/RepositoriesStore');
var RepositoriesAction = require('../../../actions/RepositoriesAction');

var ENTER_CODE = 13;

function getFormState() {
    "use strict";
    return {
        translations: TranslationStore.getTranslations(),
        formData: RepositoriesStore.getForm()
    }
}

var fields = {
    descriptionField: 'description',
    languageField: 'language',
    userField: 'user'
    //starField: 'stars',
    //nbForks: 'fork'
};

var Form = React.createClass({

    getInitialState: function () {
        "use strict";
        return (
            getFormState()
        )
    },

    componentDidMount: function () {
        "use strict";
        TranslationStore.addChangeListener(this._onChange);
        RepositoriesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        TranslationStore.removeChangeListener(this._onChange);
        RepositoriesStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <form onSubmit={this._handleSubmit} className="form">
                <div className="form-group" id={fields.descriptionField}>
                    <input type="text" className="form-control"
                           name={fields.descriptionField}
                           defaultValue={this.state.formData[fields.descriptionField]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.state.translations.REPOSITORIES_HEAD_FORM_SEARCH_FIELD}/>
                </div>

                <span className="advance">
                    <i className="glyphicon glyphicon-cog" />
                    <a data-toggle="collapse" href="#advanceSettings" aria-expanded="false">
                        {this.state.translations.REPOSITORIES_HEAD_FORM_ADVANCE_SETTINGS}
                    </a>
                    </span>

                <div id="advanceSettings" className="panel-collapse collapse">
                    <div className="form-group">
                        <div className="form-group" id={fields.languageField}>
                            <input type="text" className="form-control"
                                   name={fields.languageField}
                                   defaultValue={this.state.formData[fields.languageField]}
                                   onChange={this._updateField}
                                   onKeyDown={this._handleKeyDown}
                                   placeholder={this.state.translations.REPOSITORIES_HEAD_FORM_LANGUAGE_FIELD}/>
                        </div>

                        <input type="text" className="form-control"
                               name={fields.userField}
                               defaultValue={this.state.formData[fields.userField]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.state.translations.REPOSITORIES_HEAD_FORM_USER_FIELD}/>
                    </div>
                </div>

                <button className="btn btn-warning">{this.state.translations.VALIDATE}</button>

                <span id="error-msg" className="error-msg">{this.state.translations.REPOSITORIES_HEAD_FORM_ERROR}</span>
            </form>
        );
    },

    _updateField: function (event) {
        "use strict";
        var fieldName = event.target.name;
        var value = event.target.value;
        RepositoriesStore.updateFormField(fieldName, value);
    },

    _onChange: function () {
        "use strict";
        this.setState(getFormState);
    },

    _handleKeyDown: function (event) {
        if (event.keyCode === ENTER_CODE) {
            this._handleSubmit(event);
        }
    },

    _handleSubmit: function (event) {
        "use strict";
        event.preventDefault();
        var form = RepositoriesStore.getForm();
        if(this._checkValidParam(form)) {
            var filter = RepositoriesStore.getFilter();
            RepositoriesAction.submitSearch(form, filter);
            this._resetFormValidationError();
        }
        else this._showFormValidationError();
    },

    _checkValidParam: function(form) {
        "use strict";
        for(var field in fields) {
            if(form[fields[field]] && form[fields[field]].trim().length > 0) return true;
        }
        return false;
    },

    _showFormValidationError: function() {
        "use strict";
        var descriptionNode = jQuery('#'+fields.descriptionField);
        var languageNode = jQuery('#'+fields.languageField);
        var errorMsg = jQuery('#error-msg');
        descriptionNode.addClass('has-error has-feedback');
        languageNode.addClass('has-error has-feedback');
        errorMsg.className = errorMsg.addClass('active');
    },

    _resetFormValidationError: function() {
        "use strict";
        var descriptionNode = jQuery('#'+fields.descriptionField);
        var languageNode = jQuery('#'+fields.languageField);
        var errorMsg = jQuery('#error-msg');
        descriptionNode.removeClass('has-error has-feedback');
        languageNode.removeClass('has-error has-feedback');
        errorMsg.className = errorMsg.removeClass('active');
    }

});

module.exports = Form;