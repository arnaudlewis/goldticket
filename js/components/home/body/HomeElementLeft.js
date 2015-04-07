var React = require('react');

var HomeElementLeft = React.createClass({

    propTypes: {
        elementTitle: React.PropTypes.string,
        elementText: React.PropTypes.string,
        className: React.PropTypes.string,
        backgroundImgClass: React.PropTypes.string
    },

    render: function () {
        "use strict";
        return (
            <div className={this.props.backgroundImgClass + " home-element"}>
                <div className={this.props.className}>
                    <div className="element-block text-left">
                        <div>
                            <div className="element-title">{this.props.elementTitle}</div>
                            <hr />
                            <div className="element-text">{this.props.elementText}</div>
                        </div>
                    </div>
                    <div className="element-block">
                        <img src={this.props.elementImgUrl}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = HomeElementLeft;