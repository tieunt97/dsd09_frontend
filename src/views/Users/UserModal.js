import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function UserModal({isOpen, setIsOpen, title, selectedUser, action}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setIsOpen(false);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
      <Modal isOpen={isOpen} className="user-modal" size="lg">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" defaultValue={selectedUser && selectedUser.email ? selectedUser.email : ''} placeholder="Email" />
            </FormGroup>
            {/* <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="text" name="password" id="examplePassword" defaultValue={selectedUser && selectedUser.password ? selectedUser.password : ''} placeholder="Password" />
            </FormGroup> */}
            <FormGroup>
              <Label for="exampleName">Full Name</Label>
              <Input type="text" name="name" id="exampleName" defaultValue={selectedUser && selectedUser.name ? selectedUser.name : ''} placeholder="Full Name" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}

export default UserModal;
