import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('./components/Home.vue')
const Login = () => import('./components/Login.vue')
const Editor = () => import('./components/Editor.vue')
const Note = () => import('./components/Note.vue')
const Tag = () => import('./components/Tag.vue')
const About = () => import('./components/About.vue')
const Message = () => import('./components/Message.vue')
const FriendLink = () => import('./components/FriendLink.vue')
const NotFound = () => import('./components/NotFound.vue')

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/editor',
            component: Editor,
            meta: { requiresAuth: true }
        },
        {
            path: '/note',
            component: Note
        },
        {
            path: '/tag',
            component: Tag
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/message',
            component: Message
        },
        {
            path: '/friend-link',
            component: FriendLink
        },
        {
            path: '/error',
            component: NotFound
        },
        {
            path: '*',
            redirect: '/error'
        }
    ],
    scrollBehavior: () => ({ x: 0, y: 0 })
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = sessionStorage.getItem('blog-token')
        if (!token) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                },
                // 登录页未设置返回按钮
                replace: true
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
