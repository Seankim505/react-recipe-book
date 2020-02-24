
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditRecipeForm from './EditRecipeForm';

class EditRecipeModal extends Component {

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
      <span>
        <Button color="secondary" onClick={this.toggle}>Edit</Button>
        <Modal unmountOnClose={false} size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.recipeDetails.name}</ModalHeader>
          <ModalBody>
          <div>
            <EditRecipeForm recipeDetails={this.props.recipeDetails} formToggle={this.toggle}></EditRecipeForm>
          </div>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default EditRecipeModal;