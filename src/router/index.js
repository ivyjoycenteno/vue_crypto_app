import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/Dashboard.vue'),
        alias: ['/home', '/dashboard'],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;