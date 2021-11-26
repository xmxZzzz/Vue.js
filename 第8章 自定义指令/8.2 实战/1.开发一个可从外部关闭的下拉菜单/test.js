Vue.directive('test', {
    bind: function (el, binding, vnode) {
        console.log("v-test");
        el.dataset.first = binding.expression;
    },
    update: function (el, binding, vnode) {
        //第一次调用
        if (el.dataset.id++ == 0) {
            let preExp = el.dataset.first;
            el.dataset.first = binding.expression;
            let curExp = binding.expression;
            console.log("pre:" + preExp);
            console.log("cur: " + curExp);
        } else {
            preExp = el.dataset.first;
            curExp = binding.expression;
            el.dataset.first = binding.expression;
            console.log("pre:" + preExp);
            console.log("cur: " + curExp);
        }
    },
})