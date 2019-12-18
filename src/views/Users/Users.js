import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container} from './user.style';
import apis from '../../api/User/UserRestAPI';
import { userRoles } from '../../constants/constants';

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

  const handleDeleteUser =(userId) => {
    props.handleDeleteUser(userId);
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
        <i className="icon-plus icon-add-role"></i>
      </td>
      <td className="th-center-text">{user.registered}</td>
      <td className="th-center-text"><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
      <td className="th-center-text">
        <i className="icon-trash" onClick={() => handleDeleteUser(user.id)}></i>
        <i className="icon-pencil"></i>
      </td>
    </tr>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }

  async getAllUser() {
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
        }));
        this.setState({
          userList: usersData,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async componentDidMount() {
    this.getAllUser();
  }

  handleDeleteUser = async (userId) => {
    try {
      const {data} = await apis.deleteUser(userId);
      if(!data.status) throw new Error();
      toast.success("Xóa thành công người dùng!");
      this.getAllUser();
    } catch (error) {
      console.log('error', error);
      toast.error("Có lỗi xảy ra! Không thể xóa người dùng");
    }
  }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    const { userList } = this.state;

    return (
      <Container>
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                  <div>
                    <i className="fa fa-align-justify"></i> Users <small className="text-muted">list</small>
                  </div>
                  <Button color="primary">Create user</Button>
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
                        <UserRow key={index} user={user} handleDeleteUser={this.handleDeleteUser}/>
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
}

export default Users;
