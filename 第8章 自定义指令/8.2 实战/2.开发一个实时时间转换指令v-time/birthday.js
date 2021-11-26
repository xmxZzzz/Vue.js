var BirthDay = {
    //获取当前的时间戳
    getNowUnix() {
        var now = new Date();
        return now.getTime();
    },

    //获得标准年月日
    getLastDate() {
        var month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },

    //获取已经出生的天数
    getBirthDay(timestamp) {
        var now = this.getNowUnix();
        return Math.floor((now - timestamp) / 3600000 / 24);
    },

    //获得年龄
    getAge: function (timestamp) {
        var sumDay = this.getBirthDay(timestamp);
        var year = Math.floor(sumDay / 365);
        var month = Math.floor(sumDay % 365 / 31);
        var day = Math.floor(sumDay % 365 % 31);
        return (year == 0 ? '' : (year + "岁")) +
            (month == 0 ? '零' : (month + "个月")) +
            (day == 0 ? '' : (day + "天"));
    }

}
Vue.directive('birthday', {
    bind: function (el, binding) {
        el.innerHTML = "已经出生了" + BirthDay.getBirthDay(binding.value) + "天" +
            ', 今年' + BirthDay.getAge(binding.value);
        el.__timeout__ = setInterval(function () {
            el.innerHTML = "已经出生了" + BirthDay.getBirthDay(binding.value) + "天" +
                ', 今年' + BirthDay.getAge(binding.value);
        }, 360000 * 24)
    },
    unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})