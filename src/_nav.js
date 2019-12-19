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
          name: '\u00A0\u00A0Log Task List',
          url: '/log-task',
          icon: 'icon-book-open',
          class:'custom-sub-menu'
        },
        {
          name: '\u00A0\u00A0Statistic Daily',
          url: '/statistic-log-task-daily',
          icon: 'icon-book-open',
          class:'custom-sub-menu'
        },
        {
          name: '\u00A0\u00A0Statistic Monthly',
          url: '/statistic-log-task-monthly',
          icon: 'icon-book-open',
          class:'custom-sub-menu'
        },
      ],
    },
    {
      name: 'Log Department',
      icon: 'icon-book-open',
      children: [
        {
          name: '\u00A0\u00A0Statistic Log',
          url: '/statistic-log-department',
          icon: 'icon-book-open',
          class:'custom-sub-menu',
        },
      ],
    },
  ],
};
