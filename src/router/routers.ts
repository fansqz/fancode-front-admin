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
    meta: {
      hidden: false,
    },
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'Monitor',
          hidden: false,
        },
        component: () => import('@/views/home/index.vue'),
      },
      // 题目管理
      {
        path: '/problem',
        name: 'problem',
        meta: {
          title: '题目管理',
          icon: 'Tickets',
          hidden: false,
        },
        component: () => import('@/views/problem/problem/index.vue'),
      },
      {
        path: '/bank',
        name: 'bank',
        meta: {
          title: '题库管理',
          icon: 'Notebook',
          hidden: false,
        },
        component: () => import('@/views/problem/bank/index.vue'),
      },
      // 权限管理
      {
        path: '/permissions',
        name: 'permissions',
        meta: {
          title: '权限管理',
          icon: 'Lock',
          hidden: false,
        },
        children: [
          {
            path: '/permissions/api/view',
            name: 'api',
            meta: {
              title: '接口管理',
              icon: 'Connection',
              hidden: false,
            },
            component: () => import('@/views/permissions/api/index.vue'),
          },
          {
            path: '/permissions/menu/view',
            name: 'menu',
            meta: {
              title: '菜单管理',
              icon: 'PriceTag',
              hidden: false,
            },
            component: () => import('@/views/permissions/menu/index.vue'),
          },
          {
            path: '/permissions/role/view',
            name: 'role',
            meta: {
              title: '角色管理',
              icon: 'User',
              hidden: false,
            },
            component: () => import('@/views/permissions/role/index.vue'),
          },
          {
            path: '/permissions/user/view',
            name: 'user',
            meta: {
              title: '用户管理',
              icon: 'Avatar',
              hidden: false,
            },
            component: () => import('@/views/permissions/user/index.vue'),
          },
        ],
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
