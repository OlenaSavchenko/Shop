import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Button.scss"

export default class Button extends Component {
    render() {
        const { backgroundColor, text, className, onClick, type } = this.props
        return (<button
            type={type}
            onClick={onClick}
            style={{ backgroundColor: backgroundColor, color: "white" }}
            className={`btn ${className}`}>{text}
        </button >)
    }
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    text: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

Button.defaultProps = {
    backgroundColor: "transparent",
    text: null,
    className: "",
    onClick: () => { }

}