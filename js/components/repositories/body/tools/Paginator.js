var React = require('react');

var Paginator = React.createClass({

    propTypes : {
        currentPage: React.PropTypes.number,
        hasMore: React.PropTypes.bool,
        countRepositories: React.PropTypes.number,
        loadMore: React.PropTypes.func,
        translations: React.PropTypes.object
    },

    componentDidMount: function() {
        "use strict";
        this._managePaginatorVisibility();
    },

    componentDidUpdate: function() {
        "use strict";
        this._managePaginatorVisibility();
    },

    _managePaginatorVisibility: function () {
        "use strict";
        var paginatorNode = $('#paginator');
        if (!this._searchIsActive() || (this._isFirstPage() && !this._hasMorePages())) {
            paginatorNode.hide();
        } else {
            paginatorNode.show();
            this._managePreviousButtonVisibility();
            this._manageNextButtonVisibility();
        }
    },

    _managePreviousButtonVisibility: function () {
        "use strict";
        var previousNode = $('#previous');
        if (this._isFirstPage()) previousNode.hide();
        else previousNode.show();
    },

    _manageNextButtonVisibility: function () {
        "use strict";
        var nextNode = $('#next');
        if (this._hasMorePages()) nextNode.css({"visibility":"visible"});
        else nextNode.css({"visibility":"hidden"});
    },

    _isFirstPage: function () {
        "use strict";
        return this.props.currentPage === 1;
    },

    _hasMorePages: function () {
        "use strict";
        return this.props.hasMore;
    },

    _searchIsActive: function () {
        "use strict";
        return this.props.countRepositories > 0;
    },

    render: function () {
        "use strict";
        var pages = [];
        for (var page = 1; page <= this.props.numberOfPages; page++) {
            pages.push(<option value={page} key={page}>{page}</option>);
        }
        return (
            <div id="paginator" className="paginator">
                <button id="previous" className="btn btn-default" onClick={this._loadPreviousPage}>{this.props.translations.PREVIOUS}</button>
                <select className="form-control" value={this.props.currentPage}
                        onChange={this._loadPageNumber}>{pages}</select>
                <button id="next" className="btn btn-default" onClick={this._loadNextPage}>{this.props.translations.NEXT}</button>
            </div>
        )
    },

    _loadPreviousPage: function () {
        "use strict";
        if (!this._isFirstPage()) this.props.loadMore(this.props.currentPage - 1)
    },

    _loadNextPage: function () {
        "use strict";
        if (this._hasMorePages()) this.props.loadMore(this.props.currentPage + 1);
    },

    _loadPageNumber: function (event) {
        "use strict";
        var pageNumber = parseInt(event.target.value);
        this.props.loadMore(pageNumber);
    }
});

module.exports = Paginator;