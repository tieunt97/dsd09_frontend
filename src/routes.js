import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const LogTaskList = React.lazy(() => import('./views/LogTask/LogTaskList'));
const StatisticLogTaskDaily = React.lazy(() => import('./views/LogTask/StatisticLogTaskDaily'));
const StatisticLogTaskMonthly = React.lazy(() => import('./views/LogTask/StatisticLogTaskMonthly'));
const StatisticLogDepartment = React.lazy(() => import('./views/LogDepartment/StatisticLogDepartment'));
const LogReportList = React.lazy(() => import('./views/LogReport/LogReportList'));
const LogReportDayStatistic = React.lazy(() => import('./views/LogReport/LogReportDayStatistic'));
const LogReportMonthStatistic = React.lazy(() => import('./views/LogReport/LogReportMonthStatistic'));
const LogReportYearStatistic = React.lazy(() => import('./views/LogReport/LogReportYearStatistic'));
const LogReportServiceStatistic = React.lazy(() => import('./views/LogReport/LogReportServiceStatistic'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'User Management', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/log-task', exact: true, name: 'Log Task List', component: LogTaskList },
  { path: '/statistic-log-task-daily', exact: true, name: 'Statistic Log Task Daily', component: StatisticLogTaskDaily },
  { path: '/statistic-log-task-monthly', exact: true, name: 'Statistic Log Task Monthly', component: StatisticLogTaskMonthly },
  { path: '/statistic-log-department', exact: true, name: 'Statistic Department', component: StatisticLogDepartment },
  { path: '/log-report', exact: true, name: 'Log Report List', component: LogReportList },
  { path: '/log-report-day-statistic', exact: true, name: 'Statistic Dayly', component: LogReportDayStatistic },
  { path: '/log-report-month-statistic', exact: true, name: 'Statistic Monthly', component: LogReportMonthStatistic },
  { path: '/log-report-year-statistic', exact: true, name: 'Statistic Yearly', component: LogReportYearStatistic },
  { path: '/log-report-service-statistic', exact: true, name: 'Statistic Type Report', component: LogReportServiceStatistic },
];

export default routes;
