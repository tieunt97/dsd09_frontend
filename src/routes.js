import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const LogTaskList = React.lazy(() => import('./views/LogTask/LogTaskList'));
const StatisticLogTask = React.lazy(() => import('./views/LogTask/StatisticLogTask'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Quản lý người dùng', component: Users },
  { path: '/users/:id', exact: true, name: 'Chi tiết người dùng', component: User },
  { path: '/log-task', exact: true, name: 'Log Task List', component: LogTaskList },
  { path: '/statistic-log-task', exact: true, name: 'Statistic Log Task', component: StatisticLogTask},
];

export default routes;
