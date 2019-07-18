// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts';
import router from '@/router/index';

export const studentRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/internship/list',
    children: [
      {
        path: '/internship',
        name: 'internship',
        component: RouteView,
        meta: { title: '实训项目', keepAlive: true, icon: 'snippets' },

        children: [
          {
            path: '/internship/list',
            name: 'list',
            component: () => import('@/view/internship/list/queryList'),
            meta: { title: '项目列表', keepAlive: true }
          },
          {
            path: '我的项目',
            name: 'appliedList',
            component: () => import('@/view/internship/list/appliedList'),
            meta: { title: '我的项目', keepAlive: true }
          },
          {
            path: '/internship/detail',
            name: 'internshipDetail',
            component: () => import('@/view/internship/detail'),
            hidden: true,
            meta: { title: '实训项目', keepAlive: true }
          },
          {
            path: '/internship/completion',
            name: 'internshipCompletion',
            component: () => import('@/view/internship/completion'),
            meta: { title: '结业上传', keepAlive: true }
          }
        ]
      },
      {
        path: '/student',
        component: RouteView,
        meta: { title: '个人中心', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/student/detail',
            name: 'detail',
            component: () => import('@/view/student/detail'),
            meta: { title: '我的简历', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  }
]

export const enterpriseRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/internship/list',
    mata: { title: '首页' },
    children: [
      {
        path: '/internship',
        name: 'internship',
        component: PageView,
        meta: { title: '实训项目', keepAlive: true },
        children: [
          {
            path: '/internship/list',
            name: 'list',
            component: () => import('@/view/internship/list/queryList'),
            meta: { title: '项目列表', keepAlive: true }
          },
          {
            path: '/internship/publish',
            name: 'publish',
            component: () => import('@/view/internship/publish'),
            meta: { title: '发布实训', keepAlive: true }
          },
          {
            path: '/internship/submitprove',
            name: 'submitprove',
            component: () => import('@/view/internship/submitprove'),
            meta: { title: '提交结业证明', keepAlive: true }
          }
        ]
      },
      {
        path: '/applicationlist',
        name: 'applicatinlist',
        component: () => import('@/view/application/list/list'),
        meta: { title: '申请列表', keepAlive: true }
      },
      {
        path: '/studentmanage',
        name: 'studentmanage',
        component: () => import('@/view/student/list/list'),
        meta: { title: '学生管理', keepAlive: true }
      }
    ]
  },
  {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  },
  {
    path: '/enterpriseRegister',
    name: 'enterpriseRegister',
    component: () => import('@/view/enterpriseRegister'),
    meta: { title: '企业注册', keepAlive: true }
  },
  {
    path: '/studentRegister',
    name: 'studentRegister',
    component: () => import('@/view/studentRegister'),
    meta: { title: '学生注册', keepAlive: true }
  }
]

export const adminRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/internshiplist',
    children: [
      {
        path: '/internshiplist',
        name: 'internshiplist',
        component: () => import('@/view/internship/list/queryList'),
        meta: { title: '项目列表' }
      },
      {
        path: '/enterprise',
        name: 'enterpriselist',
        component: () => import('@/view/enterprise/list/queryList'),
        meta: { title: '企业列表' }
      },
      {
        path: '/grade',
        component: () => import('@/view/admin/grade'),
        name: 'grade',
        meta: { title: '成绩管理' }
      },
      {
        path: '/admin',
        component: () => import('@/view/admin/setting'),
        name: 'setting',
        meta: { title: '个人设置' }
      }
    ]
  },
  {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  }
]

// export const enterpriseRouterMap = []

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/view/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
