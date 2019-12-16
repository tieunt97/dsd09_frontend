import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const LogTaskList = React.lazy(() => import('./views/LogTask/LogTaskList'));
const StatisticLogTask = React.lazy(() => import('./views/LogTask/StatisticLogTask'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/log-task', exact: true, name: 'Log Task List', component: LogTaskList },
  { path: '/statistic-log-task', exact: true, name: 'Statistic Log Task', component: StatisticLogTask},
];

export default routes;
