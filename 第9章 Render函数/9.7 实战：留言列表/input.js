Vue.component('v-input', {
    render: function (h) {
        const _this = this;
        return h('div', [
            h('span', "昵称："),
            h('input', {
                attrs: {
                    type: 'text'
                },
                domProps: {
                    value: this.value
                },
                on: {
                    input: function (event) {
                        _this.value = event.target.value;
                        _this.$emit('input', _this.value);
                    }
                }
            })
        ])
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
})

Vue.component('v-textarea', {
    render: function (h) {
        const _this = this;
        return h('div', [
            h('span', "留言内容："),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                ref: 'message',
                domProps: {
                    value: this.value
                },
                on: {
                    input: function (event) {
                        _this.value = event.target.value;
                        _this.$emit('input', _this.value);
                    }
                }
            })
        ])
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        focus() {
            this.$refs.message.focus();
        }
    }
})