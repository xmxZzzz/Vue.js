<template>
    <div>
        <h1>首页</h1>
        <!-- 会被渲染为一个a标签 -->
        <router-link to="/about" replace>跳转到about</router-link>
        
        <p>测试Vuex中的mutations</p>
        <h2>{{count}}</h2>
        <button @click="handleIncrease">+1</button>
        <button @click="handleIncreaseMore">+5</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleDecreaseMore">-5</button>

         <p>测试Vuex中的actions</p>
        <h2>{{aCount}}</h2>
        <button @click="handleActionIncrease">action+2</button>
        <button @click="handleAsyncActionIncrease">async+2</button>

        <p>测试Vuex中的getters</p>
        <h2>{{oriList}}</h2>
        <h2>{{list}}</h2>
        <h2>{{listCount}}</h2>

        <p>验证多模块</p>
        <h2>{{moduleACount}}</h2>
        <button @click="handleModuleAIncrease">+20</button>

        <h1>验证中央事件总线插件vue-bus</h1>
        <Counter :number="number"></Counter>
    </div>
</template>
<script>
import Counter from "./Counter.vue";
export default {
    components: { Counter },
    data(){
        return {
            number:0
        }
    },
    created(){
        this.$bus.on('add',this.handleAddRandom);
    },
    beforeDestory(){
        this.$bus.off('add',this.handleAddRandom);
    },
    computed: {
        count: function () {
            return this.$store.state.count;
        },
        aCount: function () {
            return this.$store.state.count;
        },
        oriList() {
            return this.$store.state.list;
        },
        //对于Vuex中的list数据，只获取其中小于10的数据
        list() {
            //原始方法：在需要的组件的计算属性中进行过滤
            // return this.$store.state.list.filter(item=>item<10);
            //getters方法，当其它组件也需要过滤后的数据时,直接调用
            return this.$store.getters.filteredList;
        },
        //返回过滤后的list长度
        listCount: function () {
            return this.$store.getters.listCount;
        },
        moduleACount() {
            return this.$store.getters.sumCount;
        }
    },
    methods: {
        handleIncrease() {
            this.$store.commit("increment");
        },
        handleDecrease() {
            this.$store.commit("decrease");
        },
        //传递increment1()的第二个参数
        //方法一：
        handleIncreaseMore() {
            this.$store.commit("increment1", 5);
        },
        //方法二：直接使用包含type属性的对象
        handleDecreaseMore() {
            this.$store.commit({
                type: "decrease1",
                count: 5 //要传递的参数
            });
        },
        //通过调用actions中的increment()实现count+2
        handleActionIncrease() {
            this.$store.dispatch("increment");
        },
        //触发actions中的异步方法asyncIncrement
        //现象：点击按钮后，count会在1s后更新
        handleAsyncActionIncrease() {
            this.$store.dispatch("asyncIncrement").then(() => {
                console.log(this.$store.state.count);
            });
        },
        handleModuleAIncrease() {
            this.$store.commit("increaseA");
        },
        handleAddRandom(num){
            this.number+=num;
        }
    },
}
</script>
<style scoped>

</style>