import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button, Input} from 'reactstrap';
import {Container} from './user.style';
import apis from '../../api/User/UserRestAPI';
import { userRoles } from '../../constants/constants';

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
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
        <i className="icon-trash"></i>
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
      console.log('result', data.result);
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
                        <UserRow key={index} user={user}/>
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
