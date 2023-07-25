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
    path: '/problem',
    morePaths: ['/problem/add', '/problem/update/:id'],
  },
  {
    index: 'bank',
    title: '题库管理',
    icon: 'Notebook',
    path: '/bank',
    morePaths: [],
  },
];
