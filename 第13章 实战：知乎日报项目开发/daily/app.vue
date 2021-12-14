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
      <div class="daily-list" ref="list" @scroll="handleScroll">
          <template v-if="type==='recommend'">
              <div v-for="(list,index) in recommendList" :key="index">
                  <div class="daily-date">{{formatDay(list.date)}}</div>
                  <Item v-for="item in list.stories" :data="item" :key="item.id" @click.native="handleClick(item.id)"></Item>
              </div>
          </template>
          <template v-if="type==='daily'">
              <Item v-for="item in list" :key="item.id" :data="item" @click.native="handleClick(item.id)"></Item>
          </template>
      </div>
      <!-- 右边文件详情 -->
      <daily-article :id="articleId"></daily-article>
    </div>
</template>
<script>
import $ from './libs/util';
import Item from './components/item.vue';
import dailyArticle from './components/daily-article.vue';
export default {
    components:{
        Item,
        dailyArticle
    },
    data:function(){
        return {
            type:'recommend', //每日推荐 或者 主题日报
            showThemes:false,
            themes:[], //主题日报的分类列表
            themeId:0, //点击的主题日报的子类的id
            list:[], //中间栏主题日报文章列表
            recommendList:[],//每日推荐文章列表
            dailyTime:$.getTodayTime(),
            isLoading:false,
            articleId:0
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

        //点击每日推荐菜单触发的事件
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
        },
        //日期格式化:12月14日
        formatDay(date){
            let month = date.substr(4,2);
            let day = date.substr(6,2);
            if(month.substr(0,1)==='0') month=month.substr(1,1);
            if(day.substr(0,1)==='0') day = day.substr(1,1);
            return `${month} 月 ${day} 日`
        },

        //监听中间栏的滚动事件
        handleScroll(){
            const $list = this.$refs.list;
            //在主题日报或正在加载推荐列表时停止操作
            if(this.type=='recomment' || this.isLoading) return ;
            //当滚动到底部时
            if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
                //时间减少一天
                this.dailyTime-=86400000;
                this.getRecommendList();
            }
        },
        //获取点击文章列表的id，更新article，以获取文章详细内容
        handleClick(id){
            this.articleId=id;
        }
    },
    mounted(){
        this.getThemes();
        this.getRecommendList();
       
    }
}
</script>