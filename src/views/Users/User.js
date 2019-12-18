import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import apis from '../../api/User/UserRestAPI';
import { userRoles } from '../../constants/constants';
import {Container} from './user.style';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  async getUserDetails() {
    try {
      const userId = this.props.match.params.id;
      const {data} = await apis.getAllUser(userId);
      if(!data.status) throw new Error();
      console.log('details', data.result);
      if(data.result && data.result.length) {
        const userData = data.result[0];
        if(userData) {
          const user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            registered: userData.created_at,
            roles: userData.roles,
            status: userData.status,
          };
          this.setState({
            user,
          });
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async componentDidMount() {
    this.getUserDetails();
  }

  render() {

    const { user } = this.state;

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <Container>
        <div className="animated fadeIn">
          <Row style={{'display': 'flex', 'justifyContent': 'center'}}>
            <Col lg={10}>
              <Card>
                <CardHeader>
                  <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                </CardHeader>
                <CardBody>
                    <Table responsive striped hover>
                      <tbody>
                        {
                          userDetails.map(([key, value]) => {
                            return (
                              <tr key={key}>
                                <td>{`${key}:`}</td>
                                <td className="td-details-table">
                                  {key === 'roles' ? (
                                    value && value.length && Array.isArray(value) ? (
                                      value.map((item, index) => (
                                        <strong key={index} >{userRoles[item].name}</strong>
                                      ))
                                    ) : (
                                      ''
                                    )
                                  ) : (
                                    <strong>{value}</strong>
                                  )}
                                </td>
                              </tr>
                            )
                          })
                        }
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

export default User;
