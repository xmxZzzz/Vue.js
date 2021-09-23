var app = new Vue({
    el: '#app',
    data: {
        goods: [
            { name: 'iphone7', price: 6188, num: 1, isSelect: false },
            { name: 'ipad', price: 5888, num: 1, isSelect: false },
            { name: 'macbook', price: 21488, num: 1, isSelect: false },
        ],
        isAllSelect: false
    },
    computed: {
        totalPrice: function () {
            let total = 0;
            for (let good of this.goods) {
                if (good.isSelect) {
                    total += good.price * good.num;
                }
            }
            return total;
        }
    },
    methods: {
        sub: function (index) {
            if (this.goods[index].num === 1) return;
            this.goods[index].num--;
        },
        add: function (index) {
            this.goods[index].num++;
        },
        del: function (index) {
            this.goods.splice(index, 1);
        },
        handleAll: function () {
            this.isAllSelect = !this.isAllSelect;
            for (let good of this.goods) {
                good.isSelect = this.isAllSelect;
            }
        },
        handleSelect: function (index) {
            this.goods[index].isSelect = !this.goods[index].isSelect;
            //处理手动全选（不全选）时的情况
            //只要手动取消一个，那么全选框一定是不选的；反之同理。
            let flag = true;
            for (let good of this.goods) {
                if (!good.isSelect) {
                    flag = false;
                    break;
                }
            }
            this.isAllSelect = flag;
        }
    }
})