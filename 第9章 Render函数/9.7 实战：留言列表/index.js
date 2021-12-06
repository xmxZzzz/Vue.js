var app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: []
    },
    methods: {
        handleSend() {
            if (this.username == "") {
                alert("请输入昵称");
                return;
            }
            if (this.message == "") {
                alert("请输入发布内容");
                return;
            }
            this.list.push({
                name: this.username,
                message: this.message
            });
            this.message = "";
            this.username = "";
        },
        handleReply(index) {
            let name = this.list[index].name;
            this.message = "回复@" + name + ": ";
            this.$refs.message.focus();
        },
        handleDelete(index) {
            this.list.splice(index, 1);
        }
    }
})