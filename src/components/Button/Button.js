import PropTypes from 'prop-types';
import "./Button.scss"

const Button = ({ backgroundColor, text, className, onClick, type }) => {
    return (<button
        type={type}
        onClick={onClick}
        style={{ backgroundColor: backgroundColor, color: "white" }}
        className={className ? `btn ${className}` : "btn"}>{text}
    </button >)
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

export default Button