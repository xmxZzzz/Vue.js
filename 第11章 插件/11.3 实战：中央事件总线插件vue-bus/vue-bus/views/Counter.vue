<template>
    <div>
        {{number}}
        <button @click="handleAddRandom">随机增加</button>
    </div>
</template>

<script>
export default {
    props:{
        number:{
            type:Number,
        }
    },
    methods:{
        handleAddRandom(){
            const num = Math.floor(Math.random()*100+1);
            this.$bus.emit('add',num);
        }
    }
}
</script>

<style scoped>

</style>