<template>
    <div class="daily-article">
        <div class="daily-aticle-title">{{data.title}}</div>
        <div class="daily-aticle-content" v-html="data.body"></div>
        <!--文章底部的评论-->
        <div class="daily-comments" v-show="comments.length">
            <span>评论{{comments.length}}</span>
            <div class="daily-comment" v-for="(comment,index) in comments" :key= "index">
                <div class="daily-comment-avator">
                    <img :src="comment.avator">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{comment.author}}</div>
                    <div class="daily-comment-time" v-time="comment.time"></div>
                    <div class="daily-comment-text">{{comment.content}}</div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import Time from '../directives/time';
import '../libs/util';
export default {
    directives:{
        Time
    },
    props:{
        id:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            data:{},
            comments:[]
        }
    },
    watch:{
        id(newVal){
            this.getArticle();
        }
    },
    methods:{
        getArticle(){
            $.ajax.get('news/'+this.id).then(res=>{
                //将文章中的图片地址换为代理地址
                res.body=res.body.replace(/src="http/g,'src="'+$.imgPath+'http');
                res.body=res.body.replace(/src="https/g,'src="'+$.imgPath+'https');
                this.data = res;
                //返回文章顶端
                window.scrollTo(0,0);
                this.getComments();
            })
        },
        //获取文章对应的评论
        getComments(){
            $.ajax.get('story/'+this.id+'/short-comments').then(res=>{
                this.comments=res.comments.map(comment=>{
                    //将头像的图片转为代理地址
                    comment.avatar = $.imgPath+comment.avatar;
                    return comment;
                });
            })
        }
    }
}
</script>
