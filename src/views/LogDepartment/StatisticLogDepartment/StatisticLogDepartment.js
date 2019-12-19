import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Input, Label } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import qs from 'query-string';
import { getDepartmentList, statisticMemberGroupDay, statisicMemberGroupMonth, statisicMemberGroupYear, statisticMemberGroupStatus, 
    statisticMemberGroupDayType, statisicMemberGroupMonthType, statisicMemberGroupYearType } from '../../../api/LogDepartment/LogDepartmentRestAPI';
import { STATISTIC_DEPRTMENT_TYPE, LOG_STATUS, LOG_DEPARTMENT } from '../../../constants/constants';

const pieChart = ["4"];

const initOptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Statistic Log Department'
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total count'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: []
}

const pieOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
}

class StatisticLogDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentList: [],
            type: "1",
            department: "",
            options: initOptions,
            chartType: "column",
        }
    }

    componentDidMount() {
        getDepartmentList().then(success => {
            this.setState({
                departmentList: success.data.result || []
            });
        }).catch(error => {
            console.log('getDepartmentError: ', error);
        });
        const params = qs.parse(this.props.location.search);
        this.statisticLogDepartment(params.type, params.department);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const params = qs.parse(this.props.location.search);
            this.statisticLogDepartment(params.type, params.department);
        }
    }

    statisticLogDepartment(type, department) {
        if(type == undefined) {
            type = "1";
        }
        const params = {};
        if (department !== undefined && department !== "") {
            params.departmentId = department;
        }
        switch(type) {
            case "1":
                this.statisticMemberGroupDay(params);
                break;
            case "2":
                this.statisicMemberGroupMonth(params);
                break;
            case "3":
                this.statisicMemberGroupYear(params);
                break;
            case "4":
                this.statisticMemberGroupStatus(params);
                break;
            case "5":
                this.statisticMemberGroupDayType(params);
                break;
            case "6":
                this.statisicMemberGroupMonthType(params);
                break;
            case "7":
                this.statisicMemberGroupYearType(params);
                break;
            default:
                this.statisticMemberGroupDay(params);
                break;
        }
    }

    statisticMemberGroupCommon(type, results) {
        if (Object.entries(results).length === 0 && results.constructor === Object) {
            this.setState({
                options: initOptions,
            });
        } else {
            const keys = Object.keys(results);
            const values = keys.map(k => {
                return results[k];
            });
            const logStatus = Object.keys(type ? LOG_DEPARTMENT : LOG_STATUS).map(l => l.toLowerCase());
            const datas = [];
            logStatus.forEach(l => {
                datas.push([]);
            });
            values.forEach(v => {
                for (let i = 0; i < logStatus.length; i++) {
                    const value = v[logStatus[i]] || 0;
                    datas[i].push(value);
                }
            });
            const series = [];
            for (let i = 0; i < logStatus.length; i++) {
                series.push({
                    name: logStatus[i],
                    data: datas[i]
                });
            }
            const options = {
                ...initOptions,
                xAxis: {
                    categories: keys.map(k => k.replace(/_/g, "-")),
                },
                series,
            }
            this.setState({
                chartType: "column",
                options,
            });
        }
    }

    statisticMemberGroupDay(listParams) {
        statisticMemberGroupDay(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(false, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisicMemberGroupMonth(listParams) {
        statisicMemberGroupMonth(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(false, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisicMemberGroupYear(listParams) {
        statisicMemberGroupYear(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(false, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisticMemberGroupStatus(listParams) {
        statisticMemberGroupStatus(listParams).then(success => {
            console.log("success: ", success);
            // this.setState({
            //     chartType: "pie",
            //     options: pieOptions,
            // });
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisticMemberGroupDayType(listParams) {
        statisticMemberGroupDayType(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(true, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisicMemberGroupMonthType(listParams) {
        statisicMemberGroupMonthType(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(true, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    statisicMemberGroupYearType(listParams) {
        statisicMemberGroupYearType(listParams).then(success => {
            const results = success.data.result;
            this.statisticMemberGroupCommon(true, results);
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    onClickStatisticBtn = () => {
        let options = qs.parse(this.props.location.search);
        options.type = this.state.type;
        delete options.department;
        if (this.state.department != "") {
            options.department = this.state.department;
        }
        this.props.history.push({
            pathname: '/statistic-log-department',
            search: qs.stringify(options),
        });
    }

    onChangeSelect = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        console.log("value: ", pieChart.indexOf(this.state.type));
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col lg="4" md="5" sm="4" xs="6">
                                                <Row>
                                                    <Col md="3">
                                                        <Label htmlFor="type">Type</Label>
                                                    </Col>
                                                    <Col md="9">
                                                        <Input type="select" id="type" name="type" value={this.state.type} onChange={this.onChangeSelect.bind(this)}>
                                                            {
                                                                Object.keys(STATISTIC_DEPRTMENT_TYPE).map((k, i) => {
                                                                    return <option key={i} value={k}>{STATISTIC_DEPRTMENT_TYPE[k]}</option>
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg="4" md="5" sm="4" xs="6">
                                                <Row>
                                                    <Col md="3">
                                                        <Label htmlFor="department">Department</Label>
                                                    </Col>
                                                    <Col md="9">
                                                        <Input type="select" id="department" name="department" value={this.state.department} onChange={this.onChangeSelect.bind(this)}>
                                                            <option value=""></option>
                                                            {
                                                                this.state.departmentList.map((d, k) => <option key={k} value={d}>{d}</option>)
                                                            }
                                                        </Input>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm="3" md="2">
                                                <Button color="primary" onClick={this.onClickStatisticBtn.bind(this)}>Statistic</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.options} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StatisticLogDepartment;
