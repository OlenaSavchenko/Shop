import React, {Component} from 'react'
import Button from '../Button/Button'
import './Modal.scss'

class Modal extends Component{
    handleClick =()=> {
        this.props.onClick()
    }
    render(){
        const {header, text, closeButton, actions, className} = this.props
return(<>
<div className={`modal-box ${className}`}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{header}</h5>
                 { closeButton &&
                   <Button 
                   text={<span className="modal-close-icon">&times;</span >} 
                   backgroundColor="transparent" 
                   onClick ={this.handleClick}/>  
                 }
                </div>
                <div className="modal-body">{text}</div>
                <div className="modal-footer"> 
                {actions}           
                </div>
            </div>
        </div>
    <div className="modal-backdrop" onClick ={this.handleClick}></div>
          </>
)
    }
}

export default Modal