import React, { Component } from 'react'
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import './Modal.scss'

export default class Modal extends Component {
  render() {
    const { header, text, closeButton, actions, className, onClick } = this.props
    return (<>
      <div className={`modal-box ${className}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{header}</h5>
            {closeButton &&
              <Button
                text={<span className="modal-close-icon">&times;</span >}
                onClick={onClick} />
            }
          </div>
          <div className="modal-body">{text}</div>
          <div className="modal-footer">
            {actions}
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClick}></div>
    </>
    )
  }
}

Modal.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  closeButton: PropTypes.bool,
  actions: PropTypes.node,
  className: PropTypes.string
}

Modal.defaultProps = {
  header: "",
  text: "",
  closeButton: false,
  actions: null,
  className: ""
}