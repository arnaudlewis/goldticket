var React = require('react');
var jQuery = require('jquery');

var RepositoriesStore = require('../../../stores/RepositoriesStore');
var RepositoriesAction = require('../../../actions/RepositoriesAction');

var ENTER_CODE = 13;

function getFormState() {
    "use strict";
    return {
        formData: RepositoriesStore.getForm()
    }
}

var fields = {
    descriptionField: {
        name: 'description',
        validation: '^[\\w.\\-_]+$'
    },
    languageField: {
        name: 'language',
        validation: '^[\\w.\\-_]+$'
    },
    userField: {
        name: 'user',
        validation: '^[\\w.\\-_]+$'
    },
    starField: {
        name: 'stars',
        validation: '^(((>|<)?([0-9]+))|(([0-9]+)..([0-9]+)))$'
    },
    forkField: {
        name: 'forks',
        validation: '^(((>|<)?([0-9]+))|(([0-9]+)..([0-9]+)))$'
    },
    sizeField: {
        name: 'size',
        validation: '^(((>|<)?([0-9]+))|(([0-9]+)..([0-9]+)))$'
    }
};

var Form = React.createClass({

    propTypes: {
        translations: React.PropTypes.object
    },

    getInitialState: function () {
        "use strict";
        return (
            getFormState()
        )
    },

    componentDidMount: function () {
        "use strict";
        RepositoriesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        "use strict";
        RepositoriesStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <form onSubmit={this._handleSubmit} className="form">
                <input type="text" className="form-control"
                       name={fields.descriptionField.name}
                       defaultValue={this.state.formData[fields.descriptionField]}
                       onChange={this._updateField}
                       onKeyDown={this._handleKeyDown}
                       placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_SEARCH_FIELD}/>

                <span className="advance">
                    <i className="glyphicon glyphicon-cog"/>
                    <a data-toggle="collapse" href="#advanceSettings" aria-expanded="false">
                        {this.props.translations.REPOSITORIES_HEAD_FORM_ADVANCE_SETTINGS}
                    </a>
                    </span>

                <div id="advanceSettings" className="panel-collapse collapse">
                    <input type="text" className="form-control"
                           name={fields.languageField.name}
                           defaultValue={this.state.formData[fields.languageField]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_LANGUAGE_FIELD}/>

                    <input type="text" className="form-control"
                           name={fields.userField.name}
                           defaultValue={this.state.formData[fields.userField.name]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_USER_FIELD}/>

                    <input type="text" className="form-control"
                           name={fields.starField.name}
                           defaultValue={this.state.formData[fields.starField.name]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_STAR_FIELD}/>

                    <input type="text" className="form-control"
                           name={fields.forkField.name}
                           defaultValue={this.state.formData[fields.forkField.name]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_FORK_FIELD}/>

                    <input type="text" className="form-control"
                           name={fields.sizeField.name}
                           defaultValue={this.state.formData[fields.sizeField.name]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_SIZE_FIELD}/>
                </div>

                <button className="btn btn-warning">{this.props.translations.VALIDATE}</button>

                <span id="error-msg" className="error-msg">{this.props.translations.REPOSITORIES_HEAD_FORM_ERROR}</span>
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

        if (this._checkValidForm(form)) {
            var filter = RepositoriesStore.getFilter();
            RepositoriesAction.submitSearch(form, filter);
            this._resetFormValidationError();
        }
        else this._showFormValidationError();
    },

    _isEmptyfield(form, field) {
        return form[fields[field].name] === undefined || form[fields[field].name].trim() === '';
    },

    _isValidField(regex, form, field) {
        return regex.test(form[fields[field].name].trim());
    },

    _checkValidForm: function (form) {
        "use strict";
        var filledField = 0;
        var inError = false;
        for (var field in fields) {
            if (!this._isEmptyfield(form, field)) {
                filledField += 1;
                var regex = new RegExp(fields[field].validation);
                if (!_isValidField(regex, form, field)) {
                    //showFieldInError
                    inError = true;
                }
            }
        }
        return !(filledField === 0 || inError);

    },

    _showFormValidationError: function () {
        "use strict";
        var errorMsg = jQuery('#error-msg');
        errorMsg.className = errorMsg.addClass('active');
    },

    _resetFormValidationError: function () {
        "use strict";
        var errorMsg = jQuery('#error-msg');
        errorMsg.className = errorMsg.removeClass('active');
    }

});

module.exports = Form;