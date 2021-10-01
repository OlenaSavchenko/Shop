import React, {Component} from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal'
import './App.scss';

class App extends Component{
  state = {
    isFirstModalOpen: false,
    isSecondModalOpen: false
  }

onFirstOpenBtnClick=()=> {
  this.setState({ isFirstModalOpen: true})
}

onSecondOpenBtnClick=()=> {
  this.setState({ isSecondModalOpen: true})
}

closeFirstModal =()=> {
  this.setState({ isFirstModalOpen: false})
}

closeSecondModal =()=> { 
  this.setState({ isSecondModalOpen: false})
}
  render(){
    const {isFirstModalOpen, isSecondModalOpen} = this.state
     return (
    <div className="App">
      <header className="App-header">
       
        <Button 
        text="Open first modal" 
        backgroundColor="#b93b3b" 
        onClick ={this.onFirstOpenBtnClick}
        className="App__first-btn"/>
        
        <Button 
        text="Open second modal" 
        backgroundColor="#4CAF50" 
        onClick ={this.onSecondOpenBtnClick}/> 
      </header>

    {  isFirstModalOpen && <Modal 
       className="delete-modal"
       header="Do you want to delete this file?" 
       text="Once you delete this file, it won`t be possible to undo this action. 
       Are you sure you want delete it?"
       closeButton={true}
       actions={
         <>

         <Button 
         text="Ok" 
         backgroundColor="#b93b3b" 
         className="delete-modal__btn delete-modal__btn--approve"/>
        
         <Button 
         text="Cancel" 
         backgroundColor="#b93b3b" 
         onClick={this.closeFirstModal} 
         className="delete-modal__btn"/>
         </>
       }
       onClick={this.closeFirstModal}
       />
       } 

       {isSecondModalOpen && <Modal
      className="save-modal"
      header="Do you want to save this changes?" 
      text="This changes will be saved in your files."
      closeButton={true}
      actions={
      <Button 
      text="Save" 
      backgroundColor="#4CAF50"/>
      }
      onClick={this.closeSecondModal}
      />        
       }   
    </div>
  ); 
  }
}

export default App;
