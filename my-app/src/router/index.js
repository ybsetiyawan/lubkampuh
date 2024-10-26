import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginV from '@/components/LoginV.vue'
import store from '../store'
import MaterialV from '@/components/master/MaterialV.vue'
import Swal from 'sweetalert2';
import DeliveryProcess from '@/components/transaction/DeliveryProcess.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginV,
    meta: { requiresAuth: true }

  },
  
  {
    path: '/material',
    name: 'material',
    component: MaterialV,
    meta: { requiresAuth: true, requiredRoles: 1 }

  },
  
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryProcess,
    meta: { requiresAuth: true, requiredRoles: 2 }

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedInUser = store.getters.isLoggedIn;
  const roleId = store.getters.getRoleId
  console.log('roleId', roleId);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedInUser && to.path !== '/login') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      // Change 'requiresRole' to 'requiredRoles'
      if (to.matched.some(record => record.meta.requiredRoles)) {
        const requiredRoles = Array.isArray(to.meta.requiredRoles) ? to.meta.requiredRoles : [to.meta.requiredRoles];
        if (!requiredRoles.includes(Number(roleId))) {
          Swal.fire({
            title: 'You do not have access to this page.',
            icon: 'error',
            width: '380px',
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            toast: true
          });
          next(false); // Prevent navigation
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
