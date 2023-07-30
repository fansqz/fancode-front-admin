// 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      // 首页
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  // 题目管理
  {
    path: '/problem',
    component: () => import('@/layout/index.vue'),
    name: 'problem',
    children: [
      {
        path: '/problem/view',
        component: () => import('@/views/problem/problem/index.vue'),
      },
      {
        path: '/problem/update/:id',
        component: () => import('@/views/problem/problem/update.vue'),
      },
      {
        path: '/problem/bank',
        name: 'bank',
        component: () => import('@/views/problem/bank/index.vue'),
      },
    ],
  },
  // 权限管理
  {
    path: '/permissions',
    component: () => import('@/layout/index.vue'),
    name: 'permissions',
    children: [
      {
        path: '/permissions/api/view',
        component: () => import('@/views/permissions/api/index.vue'),
      },
      {
        path: '/permissions/menu/view',
        component: () => import('@/views/permissions/menu/index.vue'),
      },
      {
        path: '/permissions/role/view',
        component: () => import('@/views/permissions/role/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
  },
];
