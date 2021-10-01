import React, { Component } from 'react';
import "./Button.scss"

export default class Button extends Component {
    handleClick =()=> {
        if(this.props.onClick){
            this.props.onClick()   
        }
    }

    addBtnClassName =()=> {
       const {className} = this.props
      return className ?`btn ${className}`: "btn"
    }

    render() {
        const { backgroundColor, text} = this.props
        return (<button 
        type ="button"
         onClick ={this.handleClick} 
         style={{ backgroundColor: backgroundColor, color:"white" }} 
         className={this.addBtnClassName()}>{text}
         </button >)
    }
}