import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function ResetPasswordModal({ isOpenReset, setIsOpenReset }) {
  const [userId, setUserId] = useState('');

  const handleReset = () => {
    setIsOpenReset(false);
  }

  const closeModal = () => {
    setIsOpenReset(false);
  }

  return (
      <Modal isOpen={isOpenReset}>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleUserId">UserId</Label>
              <Input type="text" name="userId" id="exampleUserId" defaultValue='' placeholder="UserId" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleReset}>Reset Password</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}

export default ResetPasswordModal;
