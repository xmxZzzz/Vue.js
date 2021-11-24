
Vue.component("pane", {
    name: 'pane',
    template: '\
    <transition name="fade" mode="out-in">\
        <div class="pane" v-show="show">\
            <slot></slot>\
        </div>\
    </transition>',
    props: {
        label: {
            type: String,
            default: ""
        },
        name: {
            type: String
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            show: true
        }
    },
    watch: {
        label() {
            this.updateNav();
        }
    },
    methods: {
        updateNav: function () {
            this.$parent.updateNav();
        }
    },
    mounted: function () {
        this.updateNav();
    },
});