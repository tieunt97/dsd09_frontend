import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import qs from 'query-string';
import { statisticDailyLogTask } from '../../../api/LogTask/LogTaskRestAPI';
import { TASK_TYPE } from '../../../constants/constants';

const options = {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Statistic Log Task Daily'
    },

    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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

    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2],
        stack: 'male'
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
        stack: 'male'
    }, {
        name: 'John',
        data: [2, 5, 6, 2, 1],
        stack: 'female'
    }, {
        name: 'Janet',
        data: [3, 0, 4, 4, 3],
        stack: 'female'
    }]
}

class StatisticLogTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().toDate(),
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
            console.log("success: ", success);
            this.setState({
                date: date != undefined ? moment(date, "YYYY-MM-DD").toDate() : new Date(),
            });
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    onDateChange = date => {
        let options = qs.parse(this.props.location.search);
        options.date = moment(date).format("YYYY-MM-DD");
        this.props.history.push({
            pathname: '/statistic-log-task',
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
                                            // maxDate={moment().toDate()}
                                            onChange={this.onDateChange} //when day is clicked
                                        />
                                    </Col>
                                </Row>
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    options={options}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StatisticLogTask;
