import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'query-string';
import {  statisticReportForYear } from '../../../api/LogReport/LogReportRestAPI';
import { LOG_REPORT_ACTION, LOG_REPORT_STATUS } from '../../../constants/constants';

const initOptions = {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Statistic For Year'
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
            this.series.name + ': ' + this.y + '<br/>' +
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

class LogReportYearStatistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(5, 'year').toDate(),
            endDate: moment().toDate(),
            options: {},
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            const params = qs.parse(this.props.location.search);
            this.statisticReportForYear(params.startDate, params.endDate);
        }
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        this.statisticReportForYear(params.startDate, params.endDate);
    }

    statisticReportForYear = (startDate, endDate) => {
      statisticReportForYear(startDate, endDate).then(success => {
            console.log("success: ", success);
            const results = success.data.result;
            if (Object.entries(results).length === 0 && results.constructor === Object) {
                const newState = {options: initOptions};
                if(startDate != undefined) {
                    newState.startDate = moment(startDate, "YYYY-MM-DD").toDate();
                }
                if(endDate != undefined) {
                    newState.endDate = moment(endDate, "YYYY-MM-DD").toDate()
                }
                this.setState(newState);
            } else {
                const keys = Object.keys(results).sort((a, b) => a - b);
                const values = keys.map(k => {
                    return results[k];
                });
                const logReportAction = Object.keys(LOG_REPORT_ACTION);
                const logReportStatus = Object.keys(LOG_REPORT_STATUS);
                const pairValues = [];
                const datas = [];
                logReportAction.forEach(action => {
                  logReportStatus.forEach(status => {
                        pairValues.push(`${action.toLowerCase()}-${status.toLowerCase()}`);
                        datas.push([]);
                    });
                });
                values.forEach(v => {
                    for (let i = 0; i < pairValues.length; i++) {
                        const [action, status] = pairValues[i].split('-');
                        const value = (v[action] || {})[status] || 0;
                        datas[i].push(value);
                    }
                });
                const series = [];
                for (let i = 0; i < pairValues.length; i++) {
                    const [action, status] = pairValues[i].split('-');
                    series.push({
                        name: `${action}-${status}`,
                        data: datas[i],
                        stack: action,
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
                    newState.startDate = moment(startDate, "YYYY-MM-DD").toDate();
                }
                if(endDate != undefined) {
                    newState.endDate = moment(endDate, "YYYY-MM-DD").toDate()
                }
                this.setState(newState);
            }
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    onDateChange = (key, date) => {
        let options = qs.parse(this.props.location.search);
        options[key] = moment(date).format("YYYY-MM-DD");
        this.props.history.push({
            pathname: '/log-report-year-statistic',
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
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.startDate}
                                            maxDate={this.state.endDate}
                                            onChange={(date) => this.onDateChange("startDate", date)} //when day is clicked
                                        />
                                    </Col>
                                    <span>~</span>
                                    <Col sm="3" md="2">
                                        <DatePicker
                                            className="form-control"
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.endDate}
                                            maxDate={moment().toDate()}
                                            onChange={(date) => this.onDateChange("endDate", date)} //when day is clicked
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

export default LogReportYearStatistic;
