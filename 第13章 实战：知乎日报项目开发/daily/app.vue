<template>
    <div class="daily">
        <!-- 左侧菜单 -->
      <div class="daily-menu">
          <div class="dailt-menu-item" :class="{on:type==='recommend'}" @click="handleToRecommend">每日推荐</div>
          <div class="dailt-menu-item" :class="{on:type==='daily'}" @click="showThemes=!showThemes">主题日报</div>
          <ul v-if="showThemes">
              <li v-for="(item,index) in themes" :key="index">
                  <a :class="{on:item.id===themeId && type==='daily'}" @click="handleToTheme(item.id)">{{item.name}}</a>
              </li>
          </ul>
      </div>
      <!-- 中间相应列表 -->
      <div class="daily-list">
          <Item></Item>
      </div>
      <!-- 右边文件详情 -->
      <daily-article></daily-article>
    </div>
</template>
<script>
import $ from './libs/util';
export default {
    data:function(){
        return {
            type:'recommend', //每日推荐 或者 主题推荐
            showThemes:false,
            themes:[], //主题日报的分类列表
            themeId:0, //点击的主题日报的子类的id
            list:[], //中间栏主题推荐文章列表
            recommendList:[],//每日推荐文章列表
            dailyTime:$.getTodayTime(),
            isLoading:false,
        }
    },
    methods:{
        /*
            获取主题日报的分类列表，数组中的每一项的结构示例如下：
            others:[{
                    "name":"日常心理学",
                    "id":13,
                    "thumbnail":"http://pics.zhimg.com/xxx.jpg",
                    "color":15007,
                    "description":"了解自己和别人，了解彼此的欲望和局限"
                }]
        */
        getThemes(){
            //axios发起get请求
            $.ajax.get('themes').then(res=>{
                this.themes=res.others;
            })
        },

        //点击子菜单，将菜单type切换为"主题日报"高亮点击的子类，然后加载相应的文章列表
        handleToTheme(id){
            //改变菜单分类
            this.type='daily';
            //设置当前点击子类的主题日报id
            this.themeId=id;
            //清空中间栏文章列表的数据
            this.list=[];
            /*
            文章列表的结构示例如下：
            stories:[{
                "type":0,
                "id":7101963,
                "title":"写给想成为心理咨询师的学生同仁",
                "images":[
                    "http://pic1.zhimg.com/xxx.jpg"
                ]
            }]
            */
            $.ajax.get('theme/'+id).then(res=>{
                //类型为1的文章为空，过滤
                this.list = res.stories.filter(item=>item.type!=1);
            })
        },

        handleToRecommend(){
            this.type='recommend';
            this.recommendList=[];
            this.dailyTime=$.getTodayTime();
            this.getRecommendList();
        },
        getRecommendList(){
            this.isLoading=true;
            const prevDay = $.prevDay(this.dailyTime+86400000);
            $.ajax.get('news/before/'+prevDay).then(res=>{
                this.recommendList.push(res);
                this.isLoading=false;
            })

        }
    },
    mounted(){
        this.getThemes();
        this.getRecommendList();
    }
}
</script>