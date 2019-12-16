import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Label, Input, Button, FormGroup } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'query-string';
import { getLogTask } from '../../../api/LogTask/LogTaskRestAPI';
import { LOG_ACTIONS, TASK_TYPE } from '../../../constants/constants';

class LogTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: {
                type: '',
                action: '',
                startDate: moment().subtract(7, 'days').toDate(),
                endDate: moment().toDate(),
            },
            dataFilted: {
                logTasks: [],
                total_count: 0,
            },
            currentPage: 1,
            sizePerPage: 20,
            isTimeout: false,
            error: "",
        }
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        if(!params.startDate) {
            params.startDate = moment(this.state.searchVal.startDate).format("YYYY-MM-DD");
        }
        if(!params.endDate) {
            params.endDate = moment(this.state.searchVal.endDate).format("YYYY-MM-DD");
        }
        getLogTask(params).then(success => {
            this.setState({
                ...this.state,
                dataFilted: {
                    logTasks: success.data.results.data.map((d, i) => ({
                        ...d,
                        no: success.data.results.pager.offset + i + 1,
                    })),
                    total_count: success.data.results.pager.total_count,
                },
                currentPage: params.pageNum != null ? parseInt(params.pageNum) : 1,
                sizePerPage: params.limit != null ? parseInt(params.limit) : 20,
                searchVal: {
                    startDate: params.startDate ? new Date(params.startDate) : moment().subtract(7, 'days').toDate(),
                    endDate: params.endDate ? new Date(params.endDate) : moment().toDate(),
                    type: params.type ? params.type : "",
                    action: params.action ? params.action : "",
                },
                isTimeout: false,
                error: "",
            });
        }).catch(error => {
            if(error.response && error.response !== "") {
                this.setState({
                    isTimeout: false,
                    error: "Co loi xay ra"
                });
            } else {
                this.setState({
                    isTimeout: true,
                    error: "",
                });
            }
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            const params = qs.parse(this.props.location.search);
            getLogTask(params).then(success => {
                this.setState({
                    ...this.state,
                    dataFilted: {
                        logTasks: success.data.results.data.map((d, i) => ({
                            ...d,
                            no: success.data.results.pager.offset + i + 1,
                        })),
                        total_count: success.data.results.pager.total_count,
                    },
                    currentPage: params.pageNum != null ? parseInt(params.pageNum) : 1,
                    sizePerPage: params.limit != null ? parseInt(params.limit) : 20,
                    searchVal: {
                        startDate: params.startDate ? new Date(params.startDate) : moment().subtract(7, 'days').toDate(),
                        endDate: params.endDate ? new Date(params.endDate) : moment().toDate(),
                        type: params.type ? params.type : "",
                        action: params.action ? params.action : "",
                    },
                    isTimeout: false,
                    error: "",
                });
            }).catch(error => {
                if(error.response && error.response !== "") {
                    this.setState({
                        isTimeout: false,
                        error: "Co loi xay ra"
                    });
                } else {
                    this.setState({
                        isTimeout: true,
                        error: "",
                    });
                }
            });
        }
    }

    onStartDateChange = date => {
        this.setState({
            searchVal: {
                ...this.state.searchVal,
                startDate: date,
            }
        });
    }
    
    onEndDateChange = date => {
        this.setState({
            searchVal: {
                ...this.state.searchVal,
                endDate: date,
            }
        });
    }

    remote(remoteObj) {
        remoteObj.pagination = true;
        return remoteObj;
    }

    onPageChange = (page, sizePerPage) => {
        let options = qs.parse(this.props.location.search);

        options.limit = sizePerPage;
        options.pageNum = page;
        this.props.history.push({
            pathname: '/log-task',
            search: qs.stringify(options)
        });
    }
    
    sizePerPageListChange = (sizePerPage) => {
        let options = qs.parse(this.props.location.search);

        options.limit = sizePerPage;
        options.pageNum = 1;
        this.props.history.push({
            pathname: '/log-task',
            search: qs.stringify(options)
        });
    }

    onSelectChange = e => {
        this.setState({
            searchVal: {
                ...this.state.searchVal,
                [e.target.name]: e.target.value,
            }
        });
    }

    searchLogTask = () => {
        const search = {}
        const startDate = moment(this.state.searchVal.startDate).format("YYYY-MM-DD");
        search.startDate = startDate;
        const endDate = moment(this.state.searchVal.endDate).format("YYYY-MM-DD");
        search.endDate = endDate;
        if(this.state.searchVal.type != null && this.state.searchVal.type !== "") {
            search.type = this.state.searchVal.type;
        }
        if(this.state.searchVal.action != null && this.state.searchVal.action !== "") {
            search.action = this.state.searchVal.action;
        }

        this.props.history.push({
            pathname: '/log-task',
            search: qs.stringify(search)
        });

        getLogTask(search).then(success => {
            this.setState({
                ...this.state,
                dataFilted: {
                    logTasks: success.data.results.data.map((d, i) => ({
                        ...d,
                        no: success.data.results.pager.offset + i + 1,
                    })),
                    total_count: success.data.results.pager.total_count,
                },
                currentPage: 1,
                sizePerPage: 20,
                isTimeout: false,
                error: "",
            });
        }).catch(error => {
            if(error.response && error.response !== "") {
                this.setState({
                    isTimeout: false,
                    error: "Co loi xay ra"
                });
            } else {
                this.setState({
                    isTimeout: true,
                    error: "",
                });
            }
        });
    }

    clearSearch = () => {
        this.setState({
            ...this.state,
            searchVal: {
                type: '',
                action: '',
                startDate: moment().subtract(7, 'days').toDate(),
                endDate: moment().toDate(),
            },
            isTimeout: false,
            error: "",
        })   
    }

    render() {
        const fetchInfo = {
            dataTotalSize: this.state.dataFilted.total_count
        };
        const { startDate, endDate } = this.state.searchVal;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Card>
                                    <CardBody>
                                        <Row form>
                                            <Col md={5} sm={6}>
                                                <FormGroup row>
                                                    <Col xs={5}>
                                                        <Label htmlFor="type">Type</Label>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <Input id="type" name="type" type="select" value={this.state.searchVal.type} onChange={this.onSelectChange.bind(this)}>
                                                            <option value=""></option>
                                                            {
                                                                Object.keys(TASK_TYPE).map((key, index) => <option value={TASK_TYPE[key]}>{TASK_TYPE[key]}</option>)
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{size: 5, offset: 2}} sm={6}>
                                                <FormGroup row>
                                                    <Col xs={5}>
                                                        <Label htmlFor="action">Action</Label>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <Input id="action" name="action" type="select" value={this.state.searchVal.action} onChange={this.onSelectChange.bind(this)}>
                                                            <option value=""></option>
                                                            {
                                                                Object.keys(LOG_ACTIONS).map((key, index) => <option value={LOG_ACTIONS[key]}>{LOG_ACTIONS[key]}</option>)
                                                            }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md={5} sm={6}>
                                                <FormGroup row>
                                                    <Col xs={5}>
                                                        <Label htmlFor="start">Start</Label>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <DatePicker
                                                            className="form-control"
                                                            dateFormat="yyyy-MM-dd"
                                                            selected={startDate}
                                                            maxDate={endDate}
                                                            onChange={this.onStartDateChange} //when day is clicked
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{size: 5, offset: 2}} sm={6}>
                                                <FormGroup row>
                                                    <Col xs={5}>
                                                        <Label htmlFor="action">End</Label>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <DatePicker
                                                            className="form-control"
                                                            dateFormat="yyyy-MM-dd"
                                                            selected={endDate}
                                                            minDate={startDate}
                                                            maxDate={new Date()}
                                                            onChange={this.onEndDateChange} //when day is clicked
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col xs={4} md={1} sm="2">
                                                <Button size="sm" active block color="light" onClick={this.searchLogTask.bind(this)}
                                                    className="custom-font-size">Search</Button>
                                            </Col>
                                            <Col xs={4} md={1} sm="2">
                                                <Button size="sm" active block color="danger" onClick={this.clearSearch.bind(this)}
                                                    className="custom-font-size">Clear</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <BootstrapTable data={this.state.dataFilted.logTasks} striped hover tableHeaderClass='custom-table-header' tableBodyClass='custom-table-body'
                                    pagination fetchInfo={fetchInfo} remote={this.remote} version='4'
                                    options={
                                        {
                                            sizePerPage: this.state.sizePerPage,
                                            onPageChange: this.onPageChange.bind(this),
                                            sizePerPageList: [{
                                                text: '10', value: 10
                                            }, {
                                                text: '20', value: 20
                                            }, {
                                                text: '40', value: 40
                                            }, {
                                                text: 'All', value: this.state.dataFilted.total_count == 0 ? 80 : this.state.dataFilted.total_count
                                            }],
                                            page: this.state.currentPage,
                                            onSizePerPageList: this.sizePerPageListChange.bind(this),
                                            pageStartIndex: 1,
                                            paginationSize: 5,
                                            paginationPosition: 'both',
                                            hidePageListOnlyOnePage: true,
                                            noDataText: 'No data to display',
                                        }
                                    }
                                >
                                    <TableHeaderColumn dataField='no' isKey width="40" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >No</TableHeaderColumn>
                                    <TableHeaderColumn dataField='task_type' width="150" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >Task Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField='action' width="80" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >Action</TableHeaderColumn>
                                    <TableHeaderColumn dataField='task_id' width="150" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >Task Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='origin_id' width="150" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >Origin Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='action_date' width="150" thStyle={{ backgroundColor: '#ddf4ff' }} tdStyle={{ paddingLeft: "0.5%", textVertical: 'middle' }} >Action Date</TableHeaderColumn>
                                </BootstrapTable>                            
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LogTaskList;
