// 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      hidden: false,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      hidden: false,
    },
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
    ],
  },
];

// 异步路由
export const asyncRoute = [
  {
    path: '/manage',
    component: () => import('@/layout/index.vue'),
    name: 'manage',
    meta: {
      hidden: false,
    },
    children: [
      // 题目管理
      {
        path: '/manage/problem',
        name: 'problem',
        meta: {
          title: '题目管理',
          icon: 'Tickets',
          hidden: false,
        },
        component: () => import('@/views/problem/problem/index.vue'),
      },
      {
        path: '/manage/bank',
        name: 'bank',
        meta: {
          title: '题库管理',
          icon: 'Notebook',
          hidden: false,
        },
        component: () => import('@/views/problem/bank/index.vue'),
        children: [
          {
            // 更新题库
            path: '/manage/bank/update',
            name: 'bank-update',
            meta: {
              hidden: true,
            },
          },
        ],
      },
      // 权限管理
      {
        path: '/manage/permissions',
        name: 'permissions',
        meta: {
          title: '权限管理',
          icon: 'Lock',
          hidden: false,
        },
        children: [
          {
            path: '/manage/permissions/api',
            name: 'api',
            meta: {
              title: '接口管理',
              icon: 'Connection',
              hidden: false,
            },
            component: () => import('@/views/permissions/api/index.vue'),
          },
          {
            path: '/manage/permissions/menu',
            name: 'menu',
            meta: {
              title: '菜单管理',
              icon: 'PriceTag',
              hidden: false,
            },
            component: () => import('@/views/permissions/menu/index.vue'),
          },
          {
            path: '/manage/permissions/role',
            name: 'role',
            meta: {
              title: '角色管理',
              icon: 'User',
              hidden: false,
            },
            component: () => import('@/views/permissions/role/index.vue'),
          },
          {
            path: '/manage/permissions/user',
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
];

// 任意路由
export const anyRoute = [
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      hidden: false,
    },
  },
];
