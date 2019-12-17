export default {
  items: [
    {
      name: 'Quản lý người dùng',
      url: '/users',
      icon: 'icon-user',
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
