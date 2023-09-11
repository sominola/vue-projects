import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/auth/Test.vue';
import type { NavigationGuard } from 'vue-router';
import { toast } from 'vue-sonner';

const HomeView = () => import('@/views/HomeView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')
const SignInView = () => import('@/views/auth/SignInView.vue')

const authGuard: NavigationGuard = async (to, from, next) => {
    if (localStorage.getItem('access_token'))
        next();
    else {
        toast.error('Please sign in!')
        next('/sign-in');
    }
};

const noAuthGuard: NavigationGuard = async (to, from, next) => {
    if (localStorage.getItem('access_token') == null)
        next();
    else {
        toast.error('You are already sign in')
        next('/test');
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: 'sign-up',
                    name: 'sign-up',
                    component: SignUpView,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'sign-in',
                    name: 'sign-in',
                    component: SignInView,
                    meta: { requiresAuth: false }
                },
                {
                    path: 'test',
                    name: 'test',
                    component: Test,
                    meta: { requiresAuth: true }
                }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth === true)) {
        console.log('AuthGuard')
        authGuard(to, from, next);
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        console.log('NoAuthGuard')
        noAuthGuard(to, from, next);
    }
    else {
        next();
    }
});

export default router