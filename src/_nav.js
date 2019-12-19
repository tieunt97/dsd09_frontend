export default {
  items: [
    {
      name: 'User Management',
      url: '/users',
      icon: 'icon-user',
    },
    {
      name: 'Log Task',
      icon: 'icon-note',
      children: [
        {
          name: '\u00A0\u00A0Log Task List',
          url: '/log-task',
          icon: 'icon-note',
          class:'custom-sub-menu'
        },
        {
          name: '\u00A0\u00A0Statistic Daily',
          url: '/statistic-log-task-daily',
          icon: 'icon-note',
          class:'custom-sub-menu'
        },
        {
          name: '\u00A0\u00A0Statistic Monthly',
          url: '/statistic-log-task-monthly',
          icon: 'icon-note',
          class:'custom-sub-menu'
        },
      ],
    },
    {
      name: 'Log Department',
      icon: 'icon-grid',
      children: [
        {
          name: '\u00A0\u00A0Statistic Log',
          url: '/statistic-log-department',
          icon: 'icon-grid',
          class:'custom-sub-menu',
        },
      ],
    },
    {
      name: 'Log Report',
      icon: 'icon-book-open',
      children: [
        {
          name: '\u00A0\u00A0Log Report List',
          url: '/log-report',
          icon: 'icon-book-open',
          class:'custom-sub-menu'
        },
        {
          name: '\u00A0\u00A0Log Report Statistic',
          url: '/log-report-statistic',
          icon: 'icon-book-open',
          class:'custom-sub-menu'
        },
      ],
    },
  ],
};
