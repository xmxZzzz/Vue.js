function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + " ");
}

Vue.component("input-number", {
    template: `\
    <div>\
        <input type="text" :value="currentValue" @change="handleChange" @keyup.up="handleIncrease" @keyup.down="handleReduce">\
        <button @click="handleIncrease" :disabled="currentValue>=max">+</button>\
        <button @click="handleReduce" :disabled="currentValue<=min">-</button>\
    </div>`,
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
        },
        // 控制步伐
        step: {
            type: Number,
            default: 1
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
        handleChange: function (event) {
            let val = event.target.value.trim();
            let max = this.max;
            let min = this.min;
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;

            }
        },
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleIncrease: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleReduce: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
    },
    mounted: function () {
        //第一次初始化时，对value进行过滤
        this.updateValue(this.value);
    }
});