export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Log Task',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Log Task List',
          url: '/log-task',
          icon: 'icon-cursor',
        },
        {
          name: 'Statistic Log Task',
          url: '/statistic-log-task',
          icon: 'icon-cursor',
        },
      ],
    },
  ],
};
