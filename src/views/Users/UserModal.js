import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apis from '../../api/User/UserRestAPI';

function UserModal({isOpen, setIsOpen, title, selectedUser, action, updateTable}) {
  const [email, setEmail] = useState(selectedUser && selectedUser.email ? selectedUser.email : '');
  // const [password, setPassword] = useState('');
  const [name, setName] = useState(selectedUser && selectedUser.name ? selectedUser.name : '');

  async function handleSubmit() {
    try {
      const trimName = name.trim();
      const initEmail = email ? email : (selectedUser && selectedUser.email ? selectedUser.email : '');
      const initName = trimName ? trimName : (selectedUser && selectedUser.name ? selectedUser.name : '');
      if(!initEmail || !initName) {
        toast.warn('Email và tên không được trống!');
      } else {
        if(action === 'update') {
          const { data } = await apis.updateUser(selectedUser.id, initEmail, initName);
          if(data.code === 1000) {
            toast.error('Người dùng không tồn tại!');
            throw new Error();
          }
          if(data.code === 1001) {
            toast.error('Email đã tồn tại!');
            throw new Error();
          }
          if(!data.status) {
            toast.error('Có lỗi xảy ra! Không thể cập nhật người dùng');
            throw new Error();
          }
          toast.success('Cập nhật người dùng thành công!');
          const usersData = {
            id: selectedUser.id,
            email: initEmail,
            name: initName,
            registered: selectedUser.registered,
            roles: selectedUser.roles,
            status: selectedUser.status,
            password: selectedUser.password,
          };
          updateTable(usersData, action);
          setEmail('');
          setName('');
          setIsOpen(false);
        } else {
          const { data } = await apis.createUser(initEmail, initName);
          if(data.code === 1001) {
            toast.error('Email đã tồn tại!');
            throw new Error();
          }
          if(!data.status) {
            toast.error('Có lỗi xảy ra! Không thể tạo mới người dùng');
            throw new Error();
          }
          toast.success('Tạo mới người dùng thành công!');
          if(data.result) {
            const usersData = {
              id: data.result.id,
              email: data.result.email,
              name: data.result.name,
              registered: data.result.created_at,
              roles: data.result.roles,
              status: data.result.status,
              password: data.result.password,
            };
            updateTable(usersData, action);
          }
          setEmail('');
          setName('');
          setIsOpen(false);
        }
      }
    } catch (error) {
      console.log('error', error);
      setEmail('');
      setName('');
    }
  };

  const closeModal = () => {
    setEmail('');
    setName('');
    setIsOpen(false);
  };

  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    switch (e.target.name) {
      case 'email':
        setEmail(value.trim());
        break;
      case 'name':
        setName(value);
        break;
      default:
        break;
    }
  };

  return (
      <Modal isOpen={isOpen} className="user-modal" size="lg">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                defaultValue={selectedUser && selectedUser.email ? selectedUser.email : ''}
                placeholder="Email"
                required
                onChange={handleChange}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="text" name="password" id="examplePassword" defaultValue={selectedUser && selectedUser.password ? selectedUser.password : ''} placeholder="Password" />
            </FormGroup> */}
            <FormGroup>
              <Label for="exampleName">Full Name</Label>
              <Input
                type="text"
                name="name"
                id="exampleName"
                defaultValue={selectedUser && selectedUser.name ? selectedUser.name : ''}
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
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
