// 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  // 首页
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/problem',
        name: 'problem',
        component: () => import('@/views/problem/problem/index.vue'),
      },
      {
        path: '/problem/add',
        component: () => import('@/views/problem/problem/add.vue'),
      },
      {
        path: '/problem/update',
        component: () => import('@/views/problem/problem/update.vue'),
      },
      {
        path: '/bank',
        name: 'bank',
        component: () => import('@/views/problem/bank/index.vue'),
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
