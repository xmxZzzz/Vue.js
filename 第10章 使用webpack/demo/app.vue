<template>
  <div>
      Hello {{nameMsg}}
      <v-title title="Vue组件化"></v-title>
      <v-button @click="handleClick">点击按钮</v-button>
      <p>
          <img src="./imges/colgroup.png" style="width:400px">
      </p>
  </div>
</template>
   
<script>
import vTitle from './title.vue';
import vButton from './button.vue';

export default {
    components:{
        vTitle,
        vButton
    },
    data(){
        return {
            nameMsg:"Vue.js"
        }
    },
    methods:{
        handleClick:function(e){
            console.log(e);
        }
    }
}
</script>

<style scoped>
div{
    color:'#f60';
    font-size: 24px;
}
</style>