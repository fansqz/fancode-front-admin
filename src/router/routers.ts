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
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/problem',
        name: 'problem',
        component: () => import('@/views/problem/problem/index.vue'),
        meta: {
          title: '题目管理',
          hidden: false,
          icon: 'Tickets',
        },
      },
      {
        path: '/bank',
        name: 'bank',
        component: () => import('@/views/problem/bank/index.vue'),
        meta: {
          title: '题库管理',
          hidden: false,
          icon: 'Notebook',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
];
