<template>
    <div>
        {{$route.params.id}}
    </div>    
</template>
<script>
export default {
    mounted(){
        //this.$route可以访问到当前路由的信息
        console.log(this.$route.params.id);
    }
}
</script>
<style scoped>

</style>