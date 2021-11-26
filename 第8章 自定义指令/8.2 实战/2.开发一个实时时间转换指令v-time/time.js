var Time = {
    //获得当前时间的时间戳
    getUnix() {
        var date = new Date();
        return date.getTime();
    },
    //获得本日0点0分0秒的时间戳
    getTodayUnix() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获得本月1日0点0分0秒的时间戳
    getMonthUnix() {
        var date = new Date();
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获得本年1月1日0点0分0秒的时间戳
    getYearUnix() {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获得标准年月日
    getLastDate: function (time) {
        var date = new Date(time);
        var month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },

    //根据传入的参数进行转换时间
    getFormatTime: function (timestamp) {
        var now = this.getUnix();
        var today = this.getTodayUnix();
        var month = this.getMonthUnix();
        var year = this.getYearUnix();
        //获得参数与当前的时间差
        var timer = (now - timestamp) / 1000;
        var msg = '';

        // console.log("时间转换的逻辑：");
        // console.log("1分钟以前，显示'刚刚'");
        // console.log("1分钟~1小时之间，显示'xx分钟之前'");
        // console.log("1小时~1天之间，显示'xx小时前'");
        // console.log("1天~1个月(31天)之间，显示'xx天前'");
        // console.log("大于1个月，显示'xx年xx月xx日'");
        if (timer <= 0) msg = "刚刚";
        else if (Math.floor(timer / 60) <= 0) msg = "刚刚";
        else if (timer < 3600) msg = Math.floor(timer / 60) + '分钟前';
        else if (timer >= today) msg = Math.floor(timer / 3600) + "小时前";
        else if (timer >= month) msg = Math.floor(timer / 86400) + "天前";
        else msg = Time.getLastDate(timestamp);
        return msg;
    }

}
Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000)
    },
    unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})