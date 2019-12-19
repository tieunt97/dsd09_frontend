import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import { Container } from './index.style';
import { getLogReportList } from '../../../api/LogReport/LogReportRestAPI';

function LogReportRow({ logReport, index }) {
  const getBadgeStatus = (status) => {
    return status === 'SUCCESS' ? 'success' :
      status === 'ERROR' ? 'danger' :
        'secondary'
  }

  const getBadgeAction = (action) => {
    return action === 'CREATE' ? 'success' :
      action === 'EDIT' ? 'primary' :
        action === 'DELETE' ? 'danger' :
        'secondary'
  }

  return (
    <tr key={logReport.id.toString()}>
      <th scope="row">{index + 1}</th>
      <td className="th-center-text">{logReport.reportType}</td>
      <td className="th-center-text"><Badge color={getBadgeAction(logReport.action)}>{logReport.action}</Badge></td>
      <td className="th-center-text">{logReport.reportId}</td>
      <td className="th-center-text">{logReport.originId}</td>
      <td className="th-center-text"><Badge color={getBadgeStatus(logReport.status)}>{logReport.status}</Badge></td>
      <td className="th-center-text">{logReport.actionDate}</td>
    </tr>
  )
}

function LogReportList() {
  const [ logReportList, setLogReportList ] = useState([]);

  async function getAllLogReport() {
    try {
      const { data } = await getLogReportList();
      if(!data.status) throw new Error();
      console.log('data', data);
      if(data.result && data.result.length) {
        const logReportData = data.result.map(item => ({
          id: item.id,
          reportType: item.service,
          action: item.type,
          reportId: item.report_id,
          originId: item.action_user_id, // id nguoi thuc hien hanh dong
          status: item.status,
          actionDate: item.create_time,
        }));
        setLogReportList(logReportData);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getAllLogReport();
  }, []);

  return (
    <Container>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Log Report <small className="text-muted">list</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col" className="th-center-text">No</th>
                      <th scope="col" className="th-center-text">Report Type</th>
                      <th scope="col" className="th-center-text">Action</th>
                      <th scope="col" className="th-center-text">Report Id</th>
                      <th scope="col" className="th-center-text">Origin Id</th>
                      <th scope="col" className="th-center-text">Status</th>
                      <th scope="col" className="th-center-text">Action Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logReportList.map((logReport, index) =>
                      <LogReportRow key={index} logReport={logReport} index={index} />
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

export default LogReportList;
