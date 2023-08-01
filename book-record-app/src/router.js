import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import store from './store' //ログイン情報を参照するためにインポート

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/profile',
      component: () => import('./components/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('./components/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          message: true
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

// export default new Router({
//   routes: [
//     { path: '/', component: Home },
//     { path: '/test', component: Test }
//   ]
// })