<template>
    <div class="pageNum">
        <!--     <v-Table v-bind:pageNum="current"></v-Table>
         -->
        <span class="perPage">
   <!-- <select  name="s-select" width="400" id="s-select" class="s-select">
          <option>1条/页</option>
          <option>2条/页</option>
          <option>3条/页</option>
          <option>4条/页</option>
          <option>5条/页</option>
          <option>6条/页</option>
          <option>7条/页</option>
        </select> -->

        <v-Select selectType="2" v-bind:options="['7条/页','8条/页','9条/页','10条/页']"></v-Select>

 </span>
        <ul class="pagination">
            <li   v-show="current != 1" @click="current-- && goto(current)"><a href="javascript:void(0);" class="prev"><</a></li>
            <li   v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                <a href="javascript:void(0);">{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="javascript:void(0);" class="next">></a></li>
            前往
            <li class="whichPage"><input v-model="pageSelected"  @keyup.enter="jumpPage" type="text"></li>
            页
        </ul>
    
    </div>

</template>

<script>
    // import store from '../components/Table'
    import vSelect from '../common/Select'
    export default {
        name: 'Paging',
        components:{
            vSelect
        },

        data ()
        {
            return {
                current: 2,
                showItem: 5,
                allpage: 8,
                pageSelected:'',
            }
        }
        ,
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
            }
        }
        ,
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
<style scoped lang="less">
    ul{
        margin: 0;
    }
    li {
        list-style: none;
    }
    
    a {
        text-decoration: none;
    }
    
    .pagination {
        position: relative;
        text-align: right;
        padding-right: 20px;
        float: right;
        font-size: 10px;
        color: #333333;
        
    }
    
    .pagination li {
        display: inline-block;
        margin: 0 5px;
    }
    
    .pagination li a {
        padding: 4px 9px;
        display: inline-block;
        border: 1px solid #ddd;
        background: #fff;
        color: #333333;
        font-size: 8px;
    }
    
    .pagination li a:hover {
        background: #eee;
    }
    
    .pagination li.active a {
        background: #46bafe;
        color: #fff;
    }
    .pagination li a.prev{
        color:#999999;
        font-weight: bold;
    }
    .pagination li a.next{
        color:#999999;
        font-weight: bold;
    }
    .s-select{
        height: 26px;
        display: block;
        background: #ffffff;
        color: #333333;
        width: 90px;
        padding-left:5px;
    }
    .perPage{
        display: block;
        float: left;
        margin-left: 20px;
    }
    .pageNum{
        margin-top: 30px;
    }
    .pageNum:after{
        content: '';
        display: block;
        clear: both;
    }
    .whichPage input{
        width: 26px;
        height: 26px;
        box-sizing:border-box;
        text-align: center;
    }
</style>
