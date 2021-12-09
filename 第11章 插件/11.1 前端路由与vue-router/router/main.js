import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.use(VueRouter);

// 路由配置
const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    //配置动态id
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    //当访问的路径不存在时，重定向到首页
    {
        path: '*',
        redirect: '/index'
    }
];

const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

//导航钩子：beforeEach和afterEach，分别会在路由即将改变前和改变后触发
router.beforeEach((to, from, next) => {
    //在路由即将改变时，设置标题
    window.document.title = to.meta.title;
    // next();

    //校验是否登录:如果登录了就可以访问，否则跳转到登录页面
    if (window.localStorage.getItem('token')) {
        next();
    } else {
        next('/login');
    }
});

router.afterEach((to, from) => {
    //解决前一个页面的滚动条在中间位置，导致跳转页面后，滚动条位置不变的问题
    window.scrollTo(0, 0);
})

new Vue({
    el: '#app',
    router: router,
    render: h => {
        return h(App)
    }
});