
import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ViewModal extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
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
          <ModalHeader toggle={this.toggle}>{this.props.rec.name}</ModalHeader>
          <ModalBody>
          <div>
            <RecipeDetails rec={this.props.rec}></RecipeDetails>
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