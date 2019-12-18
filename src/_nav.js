export default {
  items: [
    {
      name: 'User Management',
      url: '/users',
      icon: 'icon-user',
    },
    {
      name: 'Log Task',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Log Task List',
          url: '/log-task',
          icon: 'icon-book-open',
        },
        {
          name: 'Statistic Daily',
          url: '/statistic-log-task-daily',
          icon: 'icon-book-open',
        },
        {
          name: 'Statistic Monthly',
          url: '/statistic-log-task-monthly',
          icon: 'icon-book-open',
        },
      ],
    },
  ],
};
