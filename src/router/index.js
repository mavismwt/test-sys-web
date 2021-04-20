import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login/login.vue'
import teacherHome from '../views/teacher/home/home.vue'
import studentHome from '../views/student/home/home.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/teacher',
      name: 'Teacher',
      meta:{
        title: '首页'
      },
      component: teacherHome,
      redirect:'/teacher/assign',
      children:[
        {
          path:'/teacher/assign',
          component:() => import('../views/teacher/assign/assign.vue'),
        },
        {
          path:'/teacher/rank',
          component:() => import('../views/teacher/rank/rank.vue')
        },
        {
          path:'/teacher/static',
          component:() => import('../views/teacher/static/static.vue')
        },
        {
          path:'/teacher/score',
          component:() => import('../views/teacher/record/single-record.vue')
        }
      ]
    },
    {
      path: '/student',
      name: 'Student',
      meta:{
        title: '首页'
      },
      component: studentHome,
      redirect:'/student/assign',
      children:[
        {
          path:'/student/assign',
          component:() => import('../views/student/assign/assign.vue'),
        },
        {
          path:'/student/assign/detail',
          component:() => import('../views/student/assign/assign-detail.vue'),
        },
        {
          path:'/student/rank',
          component:() => import('../views/student/rank/rank.vue')
        },
        {
          path:'/student/data',
          component:() => import('../views/student/data/data.vue'),
          redirect:'/student/data/ide',
          children: [
            {
              path:'/student/data/ide',
              component: () => import('../views/student/data/data-ide.vue'),
            },
            {
              path:'/student/data/web',
              component: () => import('../views/student/data/data-web.vue'),
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log('to:' + to.path)
  next()
});

export default router
