<template>
    <div class="pageNum">

        <span class="perPage">

            <select-box selectType="2" selectTitle="8条 / 页" v-if="!showElement" :w="90" v-bind:options="['7条 / 页','8条 / 页','9条 / 页','10条 / 页']"></select-box>

        </span>

        <ul class="pagination">
            <li v-show="current != 1" @click="current-- && goto(current)"><a href="javascript:void(0);" class="prev"><</a></li>

            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                <a href="javascript:void(0);">{{index}}</a>
            </li>

            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="javascript:void(0);" class="next">></a></li>

            <li v-if="!showElement" class="travel-to">前往</li>

            <li v-if="!showElement" class="whichPage"><input v-model="pageSelected"  @keyup.enter="jumpPage" type="text"></li>
            <li v-if="!showElement">页</li>
        </ul>
    
    </div>

</template>

<script>
    import SelectBox from "@/components/select-box";

    export default {
        name: 'Paging',
        components:{
            SelectBox
        },
        props:['type'],
        data () {
            return {
                current: 2,
                showItem: 5,
                allpage: 8,
                pageSelected:'',
            }
        },
        computed:{
            pages:function () {
                var pag = [];
                if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),//从哪里开始
                        i = this.showItem;
                    if (middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
            showElement(){
                if (this.type||this.type=='simple'){
                    return true;
                }
            }
        },
        methods:{
            goto:function (index) {
                if (index == this.current) return;
                this.current = index;
                //这里可以发送ajax请求
            },

            jumpPage:function(){
                // this.$store.dispatch('changePageSelected',this.pageSelected);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .pageNum:after{
        content: '';
        display: block;
        clear: both;
    }

    .pageNum{
        margin-top: 30px;

        .perPage{
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

            .whichPage input{
                width: 29px;
                height: 30px;
                text-align: center;
                border-radius: 0;
                margin-right: 5px;
            }

            li {
                display: inline;

                &.travel-to {
                    margin: 0 4px 0 10px;
                }

                a {
                    position: relative;
                    float: left;
                    padding: 6px 10px;
                    margin-left: -1px;
                    line-height: 1.42857143;
                    color: #337ab7;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #ddd;

                    &:hover {
                        background: #eee;
                    }

                    &.prev{
                        color:#999999;
                        font-weight: bold;
                    }

                    &.next{
                        color:#999999;
                        font-weight: bold;
                    }
                }

                &.active a {
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
        padding-left:5px;
    }
</style>
