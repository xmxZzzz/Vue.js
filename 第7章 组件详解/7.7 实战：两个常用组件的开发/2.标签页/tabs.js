Vue.component("tabs", {
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
            <div v-for="(item,index) in navList" :class="tabCls(item)" @click="handleChange(index)">\
                {{item.label}}\
                <span v-if="item.closable == true" @click="deleteTab(index,event)">×</span>\
            </div>\
        </div>\
        <div class="tabs-content">\
            <slot></slot>\
        </div>\
    </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentVal: this.value,
            navList: []
        }
    },
    watch: {
        value: function (val) {
            this.currentVal = val;
        },
        currentVal: function (val) {
            this.updateStatus();
        }
    },
    methods: {
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentVal = name;
            this.$emit("input", name);
            this.$emit('on-click', name);
        },
        tabCls: function (item) {
            return [
                'tabs-tab', {
                    'tabs-tab-active': item.name == this.currentVal
                }
            ]
        },
        getTabs: function () {
            //获得所有name='pane'的子组件
            return this.$children.filter(item => {
                return item.$options.name === 'pane'
            })
        },
        updateNav: function () {
            this.navList = [];
            var _this = this;
            this.getTabs().forEach((pane, index) => {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                if (!pane.name) pane.name = index;
                if (index === 0) {
                    if (!_this.currentVal) {
                        _this.currentVal = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus: function () {
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(tab => {
                return tab.show = tab.name == _this.currentVal;
            })
        },
        deleteTab: function (index, event) {
            //当输出的tab页就是当前页
            if (this.navList[index].name == this.currentVal) {
                //当关闭的是除第一个tab页的其它页,则默认页设置为前一个tab页
                if (index > 0) {
                    this.currentVal = this.navList[index - 1].name;
                    this.navList.splice(index, 1);
                    event.stopPropagation();
                } else {
                    //当关闭的是第一页时
                    this.navList.splice(index, 1);
                    event.stopPropagation();
                    //若还有其它tab页，则默认为第1个tab页
                    if (this.navList.length > 0) {
                        this.currentVal = this.navList[0].name;
                    } else {
                        //否则设置为“”
                        this.currentVal = "";
                    }
                }
            } else {
                //当关闭页不是默认打开页
                this.navList.splice(index, 1);
                event.stopPropagation();
                if (this.navList.length == 0) {
                    this.currentVal = "";
                }
            }
        }
    },
});