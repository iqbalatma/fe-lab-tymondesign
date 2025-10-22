import {createRouter, createWebHistory} from 'vue-router'
import UserIndex from "@/views/UserIndex.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: "user-index",
            component: UserIndex,
            meta: {
                isAuth: true,
            }
        },
        {
            path: '/login',
            name: "login",
            component: Login,
            meta: {
                isAuth: false,
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth && !localStorage.getItem("access_token")) {
        return next({ name: 'login' })
    }

    next()
})
export default router
