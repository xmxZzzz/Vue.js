Vue.component("common-btn", {
    template: '\
    <div class="btns">\
        <button @click="submit" class="comBtn" v-if="topic==3">提交</button>\
        <button @click="next"  class="comBtn"v-if="topic!=3" :style="btnColor" >下一步</button>\
        <button @click="previous" class="comBtn" v-if="topic!=1" :disabled="disabled">上一步</button>\
        <button @click="reset"  class="comBtn">重置</button>\
    </div> ',
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        topicInx: {
            type: Number,
            default: 1
        },
        nextColor: {
            type: String,
            default: 'white'
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            formData: { ...this.value },
            color: this.nextColor,
            disabled: this.isDisabled,
            topic: this.topicInx
        }
    },
    computed: {
        btnColor: function () {
            return {
                'background-color': this.color
            }
        },

    },
    watch: {
        value: {
            handler: function (obj) {
                this.formData = { ...obj };
            },
            immediate: true,
            deep: true
        },
        topicInx: function (inx) {
            this.topic = inx;
        },
        topic: function (val) {
            this.$emit('on-click', val);
        },
        isDisabled: function (val) {
            this.disabled = val;
        }
    },
    methods: {
        submit: function () {
            if (this.topic == 3 && this.formData.introduce.length < 100) {
                alert("自我介绍不得少于100字！");
            } else {
                alert("submit success!");
                this.topic = 1;
                this.$emit("show-res");
            }
        },
        next: function () {
            if (this.topic == 2 && this.formData.interest.length <= 1) {
                alert("请至少选择两个选项！");
            } else {
                this.topic = this.topic + 1;
            }
        },
        previous: function () {
            this.topic = this.topic - 1;
        },
        reset: function () {
            this.$emit("change-formbean", this.formData);
        },
    },
})