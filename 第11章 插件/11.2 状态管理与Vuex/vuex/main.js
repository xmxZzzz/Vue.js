import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

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
    next();
    //校验是否登录:如果登录了就可以访问，否则跳转到登录页面
    // if (window.localStorage.getItem('token')) {
    //     next();
    // } else {
    //     next('/login');
    // }
});
router.afterEach((to, from) => {
    //解决前一个页面的滚动条在中间位置，导致跳转页面后，滚动条位置不变的问题
    window.scrollTo(0, 0);
});

const moduleA = {
    state: {
        count: 0
    },
    mutations: {
        increaseA(state) {
            state.count += 20;
        }
    },
    getters: {
        //state和getters都是moduleA的状态和getters，rootState是根节点的状态
        sumCount(state, getters, rootState) {
            return state.count + rootState.count;
        }
    }
}

const store = new Vuex.Store({
    //vuex配置
    //多模块
    modules: {
        a: moduleA
    },
    //数据保存在state字段内
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    //直接修改state里的数据
    mutations: {
        increment(state) {
            state.count++;
        },
        //指定每次增加n，默认是2
        increment1(state, n = 2) {
            state.count += n;
        },
        decrease(state) {
            state.count--;
        },
        //接受的param是一个对象
        decrease1(state, param) {
            state.count -= param.count;
        }

    },
    actions: {
        //使用action来加1
        increment(context) {
            context.commit('increment1');
        },
        //异步：使用一个Promise在1s后提交mutation，即1s后count更新
        asyncIncrement(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment1');
                }, 1000)
            });
        }
    },
    getters: {
        //返回list数组中所有小于10的数据
        filteredList(state) {
            return state.list.filter(item => item < 10);
        },
        //第二次参数可以是其它的getters方法，
        //返回上述过滤后的数组中的元素个数
        listCount: (state, getters) => {
            return getters.filteredList.length;
        }
    }
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});