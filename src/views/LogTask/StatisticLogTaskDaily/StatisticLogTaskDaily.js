import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'query-string';
import { statisticDailyLogTask } from '../../../api/LogTask/LogTaskRestAPI';
import { TASK_TYPE, LOG_ACTIONS } from '../../../constants/constants';

class StatisticLogTaskDaily extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().toDate(),
            options: {},
        }
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            const params = qs.parse(this.props.location.search);
            this.statisticDatyLogTask(params.date);
        }
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        this.statisticDatyLogTask(params.date);
    }
    
    statisticDatyLogTask = (date) => {
        statisticDailyLogTask(date).then(success => {
            const results = success.data.results;
            if (Object.entries(results).length === 0 && results.constructor === Object) {
                this.setState({
                    date: date != undefined ? moment(date, "YYYY-MM-DD").toDate() : new Date(),
                });
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

                    chart: {
                        type: 'column'
                    },
                
                    title: {
                        text: 'Statistic Log Task Daily'
                    },
                
                    xAxis: {
                        categories: keys.map(k => k + "h"),
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
                
                    series,
                }
                this.setState({
                    date: date != undefined ? moment(date, "YYYY-MM-DD").toDate() : new Date(),
                    options,
                });
            }
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    onDateChange = date => {
        let options = qs.parse(this.props.location.search);
        options.date = moment(date).format("YYYY-MM-DD");
        this.props.history.push({
            pathname: '/statistic-log-task-daily',
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
                                    <Col lg="3" md="4">
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.date}
                                            onChange={this.onDateChange} //when day is clicked
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

export default StatisticLogTaskDaily;
