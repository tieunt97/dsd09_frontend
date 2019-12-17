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
          name: 'Statistic Log Task',
          url: '/statistic-log-task',
          icon: 'icon-book-open',
        },
      ],
    },
  ],
};
