var Time = {
    //获取当前时间戳
    getUnix: function () {
        let date = new Date();
        return date.getTime();
    },
    //获取当天0:0:0的时间戳
    getTodayUnix: function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获得当月1号0:0:0的时间戳
    getMonthUnix: function () {
        let date = new Date();
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获得当年1月1号0:0:0的时间戳
    getYearUnix: function () {
        let date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //格式化日期：2021-12-14
    getLastDate: function (time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + '-' + month + "-" + day;
    },
    //转化日期
    getFormatTime: function (timestamp) {
        let now = this.getUnix();
        let today = this.getTodayUnix();
        let curMonth = this.getMonthUnix();
        let curYear = this.getYearUnix();
        let time = (now - timestamp) / 1000;
        let tip = '';
        if (time <= 0) {
            tip = "刚刚";
        } else if (Math.floor(time / 60) <= 0) {
            //1分钟内
            tip = "刚刚";
        } else if (time < 3600) {
            //1小时内
            tip = Math.floor(time / 60) + "分钟前";
        } else if (time <= today) {
            //1天内
            tip = Math.floor(time / 3600) + "小时前";
        } else if (time <= curMonth) {
            //1月内
            tip = Math.floor(time / 86400) + "天前";
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};

export default {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value * 1000);
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value * 1000);
        }, 60000)
    },
    unbind: function (el, binding) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
}