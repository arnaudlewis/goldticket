var React = require('react');

var RepositoriesStore = require('../../../stores/RepositoriesStore');
var RepositoriesAction = require('../../../actions/RepositoriesAction');
var ErrorAction = require('../../../actions/ErrorAction');

const ENTER_CODE = 13;

function getFormState() {
    "use strict";
    return {
        formData: RepositoriesStore.getEditableForm()
    }
}

var regexString = '^[\\w.\\-_]+$';
var regexNumberWithInterval = '^((((>=?)|(<=?))?([0-9]+))|(([0-9]+)..([0-9]+)))$';
var datePattern = '(([1-9][0-9]{3})-([0-1][0-9])-([0-3][0-9]))';
var regexDate = '((((>=?)|(<=?))?(' + datePattern + '))|((' + datePattern + ')..(' + datePattern + ')))$';

var fields = {
    descriptionField: {
        name: 'description',
        validation: regexString
    },
    languageField: {
        name: 'language',
        validation: regexString
    },
    userField: {
        name: 'user',
        validation: regexString
    },
    starField: {
        name: 'stars',
        validation: regexNumberWithInterval
    },
    forkField: {
        name: 'forks',
        validation: regexNumberWithInterval
    },
    sizeField: {
        name: 'size',
        validation: regexNumberWithInterval
    },

    createdField: {
        name: 'created',
        validation: regexDate
    },

    pushedField: {
        name: 'pushed',
        validation: regexDate
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
                <div id={fields.descriptionField.name} className="form-group">
                    <input type="text" className="form-control"
                           name={fields.descriptionField.name}
                           defaultValue={this.state.formData[fields.descriptionField.name]}
                           onChange={this._updateField}
                           onKeyDown={this._handleKeyDown}
                           placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_SEARCH_FIELD}/>
                </div>

                <span className="advance">
                    <i className="glyphicon glyphicon-cog"/>
                    <a data-toggle="collapse" href="#advanceSettings" aria-expanded="false">
                        {this.props.translations.REPOSITORIES_HEAD_FORM_ADVANCE_SETTINGS}
                    </a>
                    </span>

                <div id="advanceSettings" className="panel-collapse collapse">
                    <div id={fields.languageField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.languageField.name}
                               defaultValue={this.state.formData[fields.languageField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_LANGUAGE_FIELD}/>
                    </div>

                    <div id={fields.userField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.userField.name}
                               defaultValue={this.state.formData[fields.userField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_USER_FIELD}/>
                    </div>

                    <div id={fields.starField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.starField.name}
                               defaultValue={this.state.formData[fields.starField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_STAR_FIELD}/>
                    </div>

                    <div id={fields.forkField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.forkField.name}
                               defaultValue={this.state.formData[fields.forkField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_FORK_FIELD}/>
                    </div>

                    <div id={fields.sizeField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.sizeField.name}
                               defaultValue={this.state.formData[fields.sizeField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_SIZE_FIELD}/>
                    </div>

                    <div id={fields.createdField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.createdField.name}
                               defaultValue={this.state.formData[fields.createdField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_CREATED_FIELD}/>
                    </div>

                    <div id={fields.pushedField.name} className="form-group">
                        <input type="text" className="form-control"
                               name={fields.pushedField.name}
                               defaultValue={this.state.formData[fields.pushedField.name]}
                               onChange={this._updateField}
                               onKeyDown={this._handleKeyDown}
                               placeholder={this.props.translations.REPOSITORIES_HEAD_FORM_PUSHED_FIELD}/>
                    </div>
                </div>

                <button className="btn btn-warning">{this.props.translations.VALIDATE}</button>
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
        var form = RepositoriesStore.getEditableForm();

        if (this.checkValidForm(form)) {
            var filter = RepositoriesStore.getFilter();
            RepositoriesAction.submitSearch(form, filter);
            this._resetFormValidationError();
        }
    },

    _isEmptyfield: function (form, field) {
        return form[fields[field].name] === undefined || form[fields[field].name].trim() === '';
    },

    _isValidField: function (regex, form, field) {
        return regex.test(form[fields[field].name].trim());
    },

    _setFieldInError: function (field) {
        $('#' + fields[field].name).addClass('in-error');
    },

    _displayInvalidFormError: function (filled, inError) {
        "use strict";
        if (!filled) {
            ErrorAction.showError(
                this.props.translations.REPOSITORIES_HEAD_FORM_ERROR_EMPTY_FORM_TITLE,
                this.props.translations.REPOSITORIES_HEAD_FORM_ERROR_EMPTY_FORM_TEXT);
        } else if (inError) {
            ErrorAction.showError(
            this.props.translations.REPOSITORIES_HEAD_FORM_ERROR_INVALID_FORM_TITLE,
                this.props.translations.REPOSITORIES_HEAD_FORM_ERROR_INVALID_FORM_TEXT);
        }
    },

    checkValidForm: function (form) {
        "use strict";
        this._resetFormValidationError();
        var filled, inError = false;
        for (var field in fields) {
            if (!this._isEmptyfield(form, field)) {
                filled = true;
                var regex = new RegExp(fields[field].validation);
                if (!this._isValidField(regex, form, field)) {
                    this._setFieldInError(field);
                    inError = true;
                }
            }
        }
        this._displayInvalidFormError(filled, inError);
        return (filled && !inError);
    },

    _resetFormValidationError: function () {
        "use strict";
        $('.form-group').removeClass('in-error');
    }

});

module.exports = Form;