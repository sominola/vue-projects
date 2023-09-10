import {createRouter, createWebHistory} from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')
const SignInView = () => import('@/views/auth/SignInView.vue')

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
                },
                {
                    path: 'sign-in',
                    name: 'sign-in',
                    component: SignInView,
                },
            ]
        },
    ]
})

export default router