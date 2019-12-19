import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'query-string';
import {  statisticMonthlyLogTask } from '../../../api/LogTask/LogTaskRestAPI';
import { TASK_TYPE, LOG_ACTIONS } from '../../../constants/constants';

const initOptions = {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Statistic Log Task Monthly'
    },

    xAxis: {
        categories: [],
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of actions'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.userOptions.stack + " - " + this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
        }
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [],
};

class StatisticLogTaskMonthly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, 'year').toDate(),
            endDate: moment().toDate(),
            options: {},
        }
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            const params = qs.parse(this.props.location.search);
            this.statisticMonthlyLogTask(params.startDate, params.endDate);
        }
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        this.statisticMonthlyLogTask(params.startDate, params.endDate);
    }
    
    statisticMonthlyLogTask = (startDate, endDate) => {
        statisticMonthlyLogTask(startDate, endDate).then(success => {
            console.log("success: ", success);
            const results = success.data.results;
            if (Object.entries(results).length === 0 && results.constructor === Object) {
                const newState = {options: initOptions};
                if(startDate != undefined) {
                    newState.startDate = moment(startDate, "YYYY-MM").toDate();
                }
                if(endDate != undefined) {
                    newState.endDate = moment(endDate, "YYYY-MM").toDate()
                }
                this.setState(newState);
            } else {
                const keys = Object.keys(results).sort((a, b) => a - b);
                const values = keys.map(k => {
                    return results[k];
                });
                const taskTypes = Object.keys(TASK_TYPE);
                const logActions = Object.keys(LOG_ACTIONS);
                const pairValues = [];
                const datas = [];
                taskTypes.forEach(tasktype => {
                    logActions.forEach(action => {
                        pairValues.push(`${tasktype.toLowerCase()}-${action.toLowerCase()}`);
                        datas.push([]);
                    });
                });
                values.forEach(v => {
                    for (let i = 0; i < pairValues.length; i++) {
                        const [task, action] = pairValues[i].split('-');
                        const value = (v[task] || {})[action] || 0;
                        datas[i].push(value);
                    }
                });
                const series = [];
                for (let i = 0; i < pairValues.length; i++) {
                    const [task, action] = pairValues[i].split('-');
                    series.push({
                        name: action,
                        data: datas[i],
                        stack: task,
                    });
                }
                const options = {
                    ...initOptions,
                    xAxis: {
                        categories: keys.map(k => k.split("_").join("-")),
                    },
                    series,
                }
                const newState = {options};
                if(startDate != undefined) {
                    newState.startDate = moment(startDate, "YYYY-MM").toDate();
                }
                if(endDate != undefined) {
                    newState.endDate = moment(endDate, "YYYY-MM").toDate()
                }
                this.setState(newState);
            }
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    onDateChange = (key, date) => {
        let options = qs.parse(this.props.location.search);
        options[key] = moment(date).format("YYYY-MM");
        this.props.history.push({
            pathname: '/statistic-log-task-monthly',
            search: qs.stringify(options),
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="3" md="2">
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="yyyy-MM"
                                            selected={this.state.startDate}
                                            maxDate={this.state.endDate}
                                            onChange={(date) => this.onDateChange("startDate", date)} //when day is clicked
                                            showMonthYearPicker
                                        />
                                    </Col>
                                    <span>~</span>
                                    <Col sm="3" md="2">
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="yyyy-MM"
                                            selected={this.state.endDate}
                                            maxDate={moment().toDate()}
                                            onChange={(date) => this.onDateChange("endDate", date)} //when day is clicked
                                            showMonthYearPicker
                                        />
                                    </Col>
                                </Row>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={this.state.options}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StatisticLogTaskMonthly;
