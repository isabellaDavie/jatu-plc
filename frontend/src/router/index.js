import Vue from 'vue'
import VueRouter from 'vue-router'
import RootView from '../views/RootView.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: RootView,
  children: [

    {
      path: '',
      component: () => import('../views/BaseView.vue'),
      children: [{
          path: '',
          name: 'home',
          component: () => import('../views/Requests')
        },

        {
          path: '/users',
          name: 'users',
          component: () => import('../views/Users')
        },

        {
          path: '/reset-password',
          name: 'reset-password',
          component: () => import('../views/Users/ResetPassword.vue')
        },

        {
          path: '/register',
          name: 'register',
          component: () => import('../views/Register')
        },
        {
          path: '/requests',
          component: RootView,
          children: [{
              path: '',
              name: "requests",
              component: () => import('../views/Requests')
            },
            {
              path: ':requestID',
              name: 'request-detail',
              component: () => import('../views/Requests/RequestDetail.vue')
            },
          ]
        },
        {
          path: '/request-leave',
          name: "request-leave",
          component: () => import('../views/Requests/RequestLeave.vue')
        },


        {
          path: '/reports',
          component: RootView,
          children: [{
              path: '',
              name: 'reports',
              component: () => import('../views/Reports'),
              children: []
            },
            {
              path: ':reportID',
              name: 'report-details',
              component: () => import('../views/Reports/ReportDetail.vue')
            }
          ]

        }

      ]
    },

    {
      path: 'login/',
      name: 'login',
      component: () => import('../views/Login')
    },
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
