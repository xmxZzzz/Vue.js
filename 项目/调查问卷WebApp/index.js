var app = new Vue({
    el: "#app",
    data: {
        topic: 1,
        showRes: false,
        nextColor: "lightblue",
        formbean: {
            gender: '保留',
            interest: [],
            introduce: "",
        }
    },
    watch: {
        topic: function (val) {
            this.topic = val;
        }
    },
    methods: {
        changeTopic: function (val) {
            this.topic = val;
        },
        changeFormbean: function (obj) {
            if (this.topic == 1) {
                this.formbean.gender = "保留";
            } else if (this.topic == 2) {
                this.formbean.interest = [];
            } else if (this.topic == 3) {
                this.formbean.introduce = "";
            }
        },
        changeShowRes: function () {
            let submitRes = "性别：" + this.formbean.gender + '\n'
                + "兴趣：" + this.formbean.interest.join(",") + '\n'
                + "自我介绍：" + this.formbean.introduce;
            alert(submitRes);
            this.formbean = {
                gender: '保留',
                interest: [],
                introduce: "",
            };
        }
    }
});