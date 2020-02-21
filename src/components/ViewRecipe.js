
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RecipeForm from './RecipeForm';

class ViewModal extends Component {

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
      <span className="modal-test">
        <Button color="secondary" onClick={this.toggle}>View</Button>
        <Modal unmountOnClose={false} size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.recipeName}</ModalHeader>
          <ModalBody>
          <div>
            Display the recipe stuff here in a new component
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default ViewModal;