var app = new Vue({
    el: '#app',
    data: {
        goods: [
            { name: 'iphone7', price: 6188, num: 1 },
            { name: 'ipad', price: 5888, num: 1 },
            { name: 'macbook', price: 21488, num: 1 },
        ]
    },
    computed: {
        totalPrice: function () {
            let total = 0;
            for (let good of this.goods) {
                total += good.price * good.num;
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
        }
    }
})