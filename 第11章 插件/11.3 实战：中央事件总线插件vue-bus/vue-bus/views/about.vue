<template>
    <div>
        <h1>介绍页</h1>
        <button @click="handleRouter">跳转到user</button>

        <h1>验证Vuex中的getters</h1>
        <h2>{{list}}</h2>
    </div>
</template>
<script>
export default {
    computed:{
        list(){
            return this.$store.getters.filteredList;
        }
    },
    methods:{
        handleRouter(){
            this.$router.push("/user/123");
        }
    }
}
</script>
<style scoped>

</style>