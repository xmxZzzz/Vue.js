<template>
    <div>
        <h1>介绍页</h1>
        <button @click="handleRouter">跳转到user</button>
    </div>
</template>
<script>
export default {
    methods:{
        handleRouter(){
            this.$router.push("/user/123");
        }
    }
}
</script>
<style scoped>

</style>