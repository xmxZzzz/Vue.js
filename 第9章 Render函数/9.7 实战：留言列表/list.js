Vue.component('list', {
    // render: function (h) {
    //     const _this = this;
    //     var list = [];
    //     this.list.forEach((msg, index) => {
    //         var node = h('div', {
    //             attrs: {
    //                 class: 'list-item'
    //             }
    //         }, [
    //             h('span', msg.name + ":"),
    //             h('div', {
    //                 attrs: {
    //                     class: 'list-msg'
    //                 }
    //             }, [
    //                 h('p', msg.message),
    //                 h('a', {
    //                     attrs: {
    //                         class: 'list-reply'
    //                     },
    //                     on: {
    //                         click: function () {
    //                             _this.handleReply(index);
    //                         }
    //                     }
    //                 }, "回复"),
    //                 h('a', {
    //                     style: {
    //                         'margin-right': '10px'
    //                     },
    //                     on: {
    //                         click() {
    //                             _this.handleDelete(index);
    //                         }
    //                     }
    //                 }, "删除")
    //             ])
    //         ])
    //         list.push(node);
    //     });
    //     if (this.list.length) {
    //         return h('div', {
    //             attrs: {
    //                 class: 'list'
    //             }
    //         }, list);
    //     } else {
    //         return h('div', {
    //             attrs: {
    //                 class: 'list-nothing'
    //             }
    //         }, "留言列表为空");
    //     }
    // },
    template: '\
    <div v-if="list.length>0" class="list">\
        <div class="list-item" v-for="(msg,index) in list">\
            <span>{{msg.name}}:</span>\
            <div class="list-msg">\
                <p>{{msg.message}}<p>\
                <a class="list-reply" @click="handleReply(index)">回复</a>\
                <a style="margin-right:10px" @click="handleDelete(index)">删除</a>\
            </div>\
        </div>\
    </div>\
    <div v-else class="list-nothing">留言列表为空</div>',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleReply(index) {
            this.$emit('reply', index);
        },
        handleDelete(index) {
            this.$emit('delete', index);
        }
    }

})