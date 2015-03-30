var React = require('react');

var HomeElementLeft = React.createClass({

    render: function () {
        "use strict";
        return (
            <div className={this.props.backgroundImgClass + " home-element"}>
                <div className={this.props.className}>
                    <div className="element-block">
                        <span className="element-title">{this.props.elementTitle}</span>
                        <span className="element-text">{this.props.elementText}</span>
                    </div>
                    <div className="img-block">
                        <img src={this.props.elementImgUrl}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = HomeElementLeft;