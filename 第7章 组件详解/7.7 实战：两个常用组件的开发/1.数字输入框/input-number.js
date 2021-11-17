Vue.component("input-number", {
    template: '\
    <div>\
        <input type="text" v-model="currentValue">\
        <button @click="handleIncrease" :disabled="currentValue>=max">+</button>\
        <button @click="handleReduce" :disabled="currentValue<=min">-</button>\
    </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value: function (val) {
            this.updateValue(val);
        },

        currentValue: function (val) {
            //在使用v-model时改变value
            this.$emit("input", val);
            //触发自定义事件，用于告知父组件数字输入框的值有所改变
            this.$emit("on-change", val);
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleIncrease: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue++;
        },
        handleReduce: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue--;
        },
    },
    mounted: function () {
        //第一次初始化时，对value进行过滤
        this.updateValue(this.value);
    }
});