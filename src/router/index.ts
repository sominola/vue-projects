import {createRouter, createWebHistory} from 'vue-router'
import type {NavigationGuard} from 'vue-router';
import {toast} from 'vue-sonner';

const HomeView = () => import('@/views/HomeView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')
const SignInView = () => import('@/views/auth/SignInView.vue')
const SettingsView = () => import('@/views/settings/SettingsVue.vue');
const UserProfileView = () => import('@/views/settings/profile/UserProfileView.vue');
const ActiveSessionsView = () => import('@/views/settings/active-sessions/ActiveSessionsView.vue');
const ChatView = () => import('@/views/chat/ChatView.vue');

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
        next('/settings');
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/sign-in',
            component: HomeView,
            children: [
                {
                    path: 'sign-up',
                    name: 'sign-up',
                    component: SignUpView,
                    meta: {requiresAuth: false}
                },
                {
                    path: 'sign-in',
                    name: 'sign-in',
                    component: SignInView,
                    meta: {requiresAuth: false}
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: SettingsView,
                    meta: {requiresAuth: true},
                    redirect: '/settings/profile',
                    children: [
                        {
                            path: 'profile',
                            name: 'profile',
                            component: UserProfileView
                        },
                        {
                            path: 'sessions',
                            name: 'sessions',
                            component: ActiveSessionsView
                        }
                    ]
                },
                {
                    path: 'chat',
                    name: 'chat',
                    component: ChatView
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/sign-in'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth === true)) {
        authGuard(to, from, next);
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        noAuthGuard(to, from, next);
    } else {
        next();
    }
});

export default router