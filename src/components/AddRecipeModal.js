
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddRecipeForm from './AddRecipeForm';

class newRecipeModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    console.log('toggled')
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <div className="ModalButtons">
          <Button color="secondary" onClick={this.toggle}>Add New Recipe</Button>
        </div>
        <Modal unmountOnClose={false} size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New Recipe</ModalHeader>
          <ModalBody>
          <div>
            <AddRecipeForm formToggle={this.toggle}></AddRecipeForm>
          </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default newRecipeModal;