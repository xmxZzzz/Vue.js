Vue.component('v-table', {
    render(h) {
        const _this = this;
        var ths = [];
        //获得表头节点
        this.currentColumns.forEach((col, index) => {
            if (col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    //升序
                    h('a', {
                        class: {
                            //当为true时，表示选中
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: () => {
                                _this.handleSortByAsc(index);
                            }
                        }
                    }, "↑"),
                    //降序
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click: () => {
                                _this.handleSortByDesc(index);
                            }
                        }
                    }, "↓"),
                ]));
            } else {
                ths.push(h('th', col.title));
            }
        })
        var trs = [];
        //获得表格的主体
        this.currentData.forEach(element => {
            var tds = [];
            _this.currentColumns.forEach(cell => {
                tds.push(h('td', element[cell.key]))
            });
            trs.push(h('tr', tds));
        });
        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    watch: {
        data: function () {
            this.makeData();
            let sortedColumn = this.currentColumns.filter(col => {
                return col._sortType !== 'normal';
            })
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    methods: {
        makeColumns() {
            this.currentColumns = this.columns.map((col, index) => {
                //添加一个字段标识当前列排序的状态，后续使用
                col._sortType = 'normal';
                //添加一个字段标识当前列在数组后在数组中的索引，后续使用
                col._index = index;
                return col;
            })
        },
        makeData() {
            this.currentData = this.data.map((row, index) => {
                //添加一个字段标识当前行在数组中的索引，后续使用
                row._index = index;
                return row;
            })
        },
        handleSortByAsc(index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal'
            })
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a, b) => {
                return a[key] > b[key] ? 1 : -1;
            })
        },
        handleSortByDesc(index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal'
            })
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1;
            })
        }
    },
    mounted() {
        //初始化currentColumns和currentData
        this.makeColumns();
        this.makeData();
    }
})