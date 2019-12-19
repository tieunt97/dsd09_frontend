import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Container} from './user.style';
import apis from '../../api/User/UserRestAPI';
import { userRoles } from '../../constants/constants';
import UserModal from './UserModal';
import ResetPasswordModal from './ResetPasswordModal';
import AddRoleModal from './AddRoleModal';

toast.configure({
  autoClose: 3000,
  draggable: true,
  position: toast.POSITION.TOP_CENTER,
});

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'active' ? 'success' :
      status === 'inactive' ? 'secondary' :
        status === 'pending' ? 'warning' :
          status === 'banned' ? 'danger' :
            'primary'
  }

  const confirmDeleteUser =(userId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if(confirmDelete) props.handleDeleteUser(userId);
  }

  function openUserModal(user) {
    const title = 'Update user';
    const type = 'update'
    props.openUserModal(title, user, type);
  }

  function openAddRoleModal(userId) {
    props.openAddRoleModal(userId);
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row" className="th-center-text"><Link to={userLink}>{user.id}</Link></th>
      <td className="th-center-text"><Link to={userLink}>{user.email}</Link></td>
      <td className="th-center-text"><Link to={userLink}>{user.name}</Link></td>
      <td className="td-role">
        <div className="div-td-role">
          {user.roles && user.roles.length && Array.isArray(user.roles) ? (
            user.roles.map((item, index) => (
              <Badge key={index} className="badge-role" >{userRoles[item].name}</Badge>
            ))
          ) : (
            ''
          )}
        </div>
        <i className="icon-plus icon-add-role" onClick={() => openAddRoleModal(user.id)}></i>
      </td>
      <td className="th-center-text">{user.registered}</td>
      <td className="th-center-text"><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
      <td className="th-center-text">
        <i className="icon-trash" onClick={() => confirmDeleteUser(user.id)}></i>
        <i className="icon-pencil" onClick={() => openUserModal(user)}></i>
      </td>
    </tr>
  )
}

function Users() {
  const [ userList, setUserList ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState('');

  const [ isOpenReset, setIsOpenReset ] = useState(false);
  const [ isOpenAddRole, setIsOpenAddRole ] = useState(false);
  const [ restOfRole, setRestOfRole ] = useState([]);

  async function getAllUser() {
    try {
      const {data} = await apis.getAllUser();
      if(!data.status) throw new Error();
      console.log('data.result', data.result);
      if(data.result && data.result.length) {
        const usersData = data.result.map(item => ({
          id: item.id,
          email: item.email,
          name: item.name,
          registered: item.created_at,
          roles: item.roles,
          status: item.status,
          password: item.password,
        }));
        setUserList(usersData);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  async function handleDeleteUser(userId) {
    try {
      const {data} = await apis.deleteUser(userId);
      if(!data.status) throw new Error();
      toast.success("Xóa thành công người dùng!");
      const restOfUserList = userList.filter(item => item.id !== userId);
      setUserList(restOfUserList);
    } catch (error) {
      console.log('error', error);
      toast.error("Có lỗi xảy ra! Không thể xóa người dùng");
    }
  }

  function openUserModal(title, user, type) {
    setTitle(title);
    setSelectedUser(user);
    setAction(type);
    setIsOpen(true);
  }

  function openResetPasswordModal() {
    setIsOpenReset(true);
  }

  function updateTable(user, type) {
    console.log('user', user);
    if(user) {
      if(type === 'update') {
        const list = userList.map(item => {
          if(item.id === user.id) return user;
          return item;
        });
        setUserList(list);
      } else {
        userList.push(user);
      }
    }
  }

  async function openAddRoleModal(userId) {
    try {
      const {data} = await apis.getRestOfRole(userId);
      if(!data.status) throw new Error();
      if(data.result && data.result.length) {
        setRestOfRole(data.result);
      }
      setIsOpenAddRole(true);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <Container>
      <ResetPasswordModal isOpenReset={isOpenReset} setIsOpenReset={setIsOpenReset} />
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} title={title} selectedUser={selectedUser} action={action} updateTable={updateTable} />
      <AddRoleModal isOpenAddRole={isOpenAddRole} setIsOpenAddRole={setIsOpenAddRole} restOfRole={restOfRole} />
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                <div>
                  <i className="fa fa-align-justify"></i> Users <small className="text-muted">list</small>
                </div>
                <div>
                  <Button color="danger" style={{'marginRight': '10px'}} onClick={() => openResetPasswordModal()}>Reset Password</Button>
                  <Button color="primary" onClick={() => openUserModal('Create user', null, 'create')}>Create user</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col" className="th-center-text">id</th>
                      <th scope="col" className="th-center-text">email</th>
                      <th scope="col" className="th-center-text">name</th>
                      <th scope="col" className="th-center-text">role</th>
                      <th scope="col" className="th-center-text">registered</th>
                      <th scope="col" className="th-center-text">status</th>
                      <th scope="col" className="th-center-text">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} handleDeleteUser={handleDeleteUser} openUserModal={openUserModal} openAddRoleModal={openAddRoleModal} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Users;
