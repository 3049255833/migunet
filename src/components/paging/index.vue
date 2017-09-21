<template>
    <div class="pageNum">

        <span class="perPage">

            <v-select-box v-if="!showElement" :w="90"
                          :selectBoxName="'pageSize'"
                          :selectTitle="'5条 / 页'"
                          :selectValue="'5'"
                          v-on:selectBoxBus="getPageSize"
                          v-bind:options="pageSizeOperateList"></v-select-box>

        </span>
        <ul class="pagination">
            <li v-show="current != 1" @click="current-- && goto(current--)"><span class="prev pointer"><</span></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                <span>{{index}}</span>
            </li>
            <li v-show="allPage&&allPage != current && allPage != 0 " @click="current++ && goto(current++)"><span
                    class="next">></span></li>
            <li v-if="allPage&&!showElement" class="travel-to">共{{allPage}}页 前往第</li>
            <li v-if="allPage&&!showElement" class="whichPage"><input class="form-input" v-model="pageSelected"
                                                                      @keyup.enter="jumpPage" type="number">
            </li>
            <li v-if="allPage&&!showElement">页</li>
        </ul>
    </div>
</template>
<script type="es6">
    import VSelectBox from "@/components/new-select-box";

    export default {
        name: 'Paging',
        components: {
            VSelectBox
        },

        props: ['type', 'totalItem'],
        data () {
            return {
                current: 1,
                showItem: 5,
                pageSize: 5,
                pageSelected: 1,
                pageSizeOperateList: [
                    {
                        optionText: '5条 / 页 ',
                        optionValue: '5'
                    },
                    {
                        optionText: '10条 / 页 ',
                        optionValue: '10'
                    },
                    {
                        optionText: '15条 / 页 ',
                        optionValue: '15'
                    },
                    {
                        optionText: '20条 / 页 ',
                        optionValue: '20'
                    }
                ]
            }
        },
        computed: {
            pages: function () {
                var pag = [];
                if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allPage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),//从哪里开始
                        i = this.showItem;
                    if (middle > (this.allPage - this.showItem)) {
                        middle = (this.allPage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
            showElement(){
                if (this.type || this.type == 'simple') {
                    return true;
                }
            },
            allPage(){
                return Math.ceil(parseInt(this.totalItem) / parseInt(this.pageSize))
            }
        },
        methods: {
            goto: function (index) {
                if (index == this.current) return;
                this.current = index;
                //触发分页bus
                this.$emit('pagingBus', {
                    pagingSize: this.pageSize,
                    pagingValue: this.current
                })
            },

            jumpPage: function (e) {
                if (e && e.target) {
                    e.target.blur();
                }

                if (/^\d+$/gi.test(this.pageSelected)) {
                    if (this.pageSelected > this.allPage) {
                        alert('超过最大页码数');
                    } else {
                        this.current = this.pageSelected;
                        this.$emit('pagingBus', {
                            pagingValue: this.current,
                            pagingSize: this.pageSize
                        })
                    }
                } else {
                    alert('请输入数字')
                }
            },

            getPageSize:function(res){
                this.current = 1;
                this.pageSize = res.selectOption.optionValue;
                this.$emit('pagingBus', {
                    pagingSize: this.pageSize,
                    pagingValue: 1
                })
            }

        },
        watch: {
            'pageSelected'(a, b){
                if (a == 0) {
                    this.pageSelected = 1;
                }
                if (isNaN(a) || a <= 0) {
                    this.pageSelected = 1;
                }
                if (parseInt(a) > this.allPage) {
                    this.pageSelected = this.allPage;
                }
            }
        },
        created(){

        },
        mounted(){
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .pageNum:after {
        content: '';
        display: block;
        clear: both;
    }

    .pageNum {
        margin-top: 30px;

        .perPage {
            display: block;
            float: left;
            margin-left: 20px;
        }

        .pagination {
            position: relative;
            text-align: right;
            padding-right: 20px;
            float: right;
            font-size: 10px;
            color: #333;
            margin: 0;

            .whichPage input {
                width: 30px;
                height: 30px;
                line-height: 28px;
                padding: 0 !important;
                text-align: center;
                border-radius: 0;
                margin-right: 5px;
            }

            li {
                display: inline;

                &.travel-to {
                    margin: 0 4px 0 10px;
                }

                span {
                    width: 31px;
                    height: 31px;
                    text-align: center;
                    line-height: 31px;
                    position: relative;
                    float: left;
                    margin-left: -1px;
                    color: #337ab7;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    &:hover {
                        background: #eee;
                    }

                    &.prev {
                        color: #999999;
                        font-weight: bold;
                    }

                    &.next {
                        color: #999999;
                        font-weight: bold;
                    }
                }

                .prev {
                    position: relative;
                    float: left;
                    padding: 6px 10px;
                    margin-left: -1px;
                    line-height: 1.42857143;
                    color: #999999;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    &:hover {
                        background: #eee;
                    }
                    font-weight: bold;
                }
                &.active span {
                    border: 1px solid #46bafe;
                    background: #46bafe;
                    color: #fff;
                }
            }
        }
    }

    .s-select {
        height: 26px;
        display: block;
        background: #ffffff;
        color: #333333;
        width: 90px;
        padding-left: 5px;
    }
</style>
