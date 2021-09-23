var app = new Vue({
    el: '#app',
    data: {
        goods: [
            {
                name: '电子产品',
                productList: [
                    { name: 'iphone7', price: 6188, num: 1, isSelect: false },
                    { name: 'ipad', price: 5888, num: 1, isSelect: false },
                    { name: 'macbook', price: 21488, num: 1, isSelect: false }
                ]
            },
            {
                name: '果蔬',
                productList: [
                    { name: 'apple', price: 2, num: 1, isSelect: false },
                    { name: 'banana', price: 0.5, num: 1, isSelect: false },
                ],
            }
        ],
        isAllSelect: false
    },
    computed: {
        totalPrice: function () {
            let total = 0;
            for (let good of this.goods) {
                for (let item of good.productList) {
                    if (item.isSelect) {
                        total += item.price * item.num;
                    }
                }
            }
            return total;
        }
    },
    methods: {
        sub: function (index, i) {
            if (this.goods[index].productList[i].num === 1) return;
            this.goods[index].productList[i].num--;
        },
        add: function (index, i) {
            this.goods[index].productList[i].num++;
        },
        del: function (index, i) {
            this.goods[index].splice(i, 1);
        },
        handleAll: function () {
            this.isAllSelect = !this.isAllSelect;
            for (let good of this.goods) {
                for (let item of good.productList) {
                    item.isSelect = this.isAllSelect;
                }
            }
        },
        handleSelect: function (index, i) {
            this.goods[index].productList[i].isSelect = !this.goods[index].productList[i].isSelect;
            //处理手动全选（不全选）时的情况
            //只要手动取消一个，那么全选框一定是不选的；反之同理。
            let flag = true;
            for (let good of this.goods) {
                for (let item of good.productList) {
                    if (!item.isSelect) {
                        flag = false;
                        break;
                    }
                }
            }
            this.isAllSelect = flag;
        }
    }
})