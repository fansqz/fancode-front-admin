// 用于配置管理menu的
export const constantMenu = [
  {
    index: 'home',
    title: '首页',
    icon: 'HomeFilled',
    path: '/home',
    morePaths: [],
  },
  {
    index: 'problem',
    title: '题目管理',
    icon: 'Tickets',
    path: '/problem/view',
    morePaths: ['/problem/add', '/problem/update/:id'],
  },
  {
    index: 'bank',
    title: '题库管理',
    icon: 'Notebook',
    path: '/bank',
    morePaths: [],
  },
  {
    index: 'permissions',
    title: '权限管理',
    icon: 'Key',
    path: '/permissions',
    childrenMenu: [
      {
        index: 'api',
        title: '接口管理',
        icon: 'Notebook',
        path: '/permissions/api/view',
      },
      {
        index: 'role',
        title: '角色管理',
        icon: 'User',
        path: '/permissions/role',
      },
      {
        index: 'user',
        title: '用户管理',
        icon: 'Avatar',
        path: '/permissions/user',
      },
    ],
  },
];
