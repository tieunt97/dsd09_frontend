import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import apis from '../../api/User/UserRestAPI';

function ResetPasswordModal({ isOpenAddRole, setIsOpenAddRole, restOfRole }) {


  async function handleAdd() {
    setIsOpenAddRole(false);
    // try {
    //   if(userId) {
    //     const { data } = await apis.resetPassword(userId);
    //     console.log('data reset passord', data);
    //     if(data.code === 1009) {
    //       toast.error('UserId không chính xác!');
    //       throw new Error();
    //     }
    //     if(data.code === 1000) {
    //       toast.error('Người dùng không tồn tại!');
    //       throw new Error();
    //     }
    //     if(!data.status) {
    //       toast.error('Có lỗi xảy ra! Đặt lại mật khẩu không thành công');
    //       throw new Error();
    //     }
    //     toast.success('Đặt lại mật khẩu người dùng thành công!');
    //     setIsOpenReset(false);
    //   } else {
    //     toast.warn('Vui lòng nhập id!');
    //   }
    // } catch (error) {
    //   console.log('error', error);
    // }
  }

  const closeModal = () => {
    setIsOpenAddRole(false);
  }

  const handleChange = e => {
    // e.preventDefault();
    // const { name, value } = e.target;
    // setUserId(value.trim());
  }

  return (
      <Modal isOpen={isOpenAddRole}>
        <ModalHeader>Chọn một vai trò</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              {restOfRole && restOfRole.length ? (
                <Input type="select" name="select" id="exampleSelect">
                  {restOfRole.map(role => (
                    <option key={role.key} value={role.key}>{role.name}</option>
                  ))}
                </Input>
              ) : (
                ''
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAdd}>Add</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}

export default ResetPasswordModal;
