Vue.directive('clickoutside', {
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            debugger;
            // 点击的是下拉菜单内部区域
            let isOut = el.contains(e.target);
            // 按下的按键是ESC
            let isEsc = e.keyCode === 27;
            // 包含esc修饰符
            let isEscModifier = binding.modifiers && binding.modifiers.esc;

            //如果点击的是菜单内部区域，并且(支持esc修饰符的同时，按下的不是esc)
            if (isOut && !(isEsc && isEscModifier)) {
                return false;
            }
            //如果点击的是菜单内部区域，并且按下的不是esc键
            // if (isOut && !isEsc) {
            //     return false;
            // }

            // 如果点击的是外部区域，并且有表达式，则执行该表达式
            if (binding.expression) {
                binding.value(e);
            }
        }
        // 声明一个变量，用于unbind的移除
        el.__vueClickOutSide__ = documentHandler;
        document.addEventListener('click', documentHandler);
        document.addEventListener('keyup', documentHandler, false);
    },
    unbind: function (el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        document.removeEventListener('keyup', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
    },
})