var app = new Vue({
    el: '#app',
    data: {
        timeNow: (new Date()).getTime(),
        timeBefore: 1488930695721,  //2017-03-08,
        birhday: (new Date('1994/11/26 08:12:30')).getTime()
    },
    computed: {
        formatDate: function () {
            var bir = new Date(parseInt(this.birhday)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            return bir.substr(0, bir.indexOf(" "));
        }
    },
    mounted() {
        console.log("时间转换的逻辑：");
        console.log("1分钟以前，显示'刚刚'");
        console.log("1分钟~1小时之间，显示'xx分钟之前'");
        console.log("1小时~1天之间，显示'xx小时前'");
        console.log("1天~1个月(31天)之间，显示'xx天前'");
        console.log("大于1个月，显示'xx年xx月xx日'");
    }
})