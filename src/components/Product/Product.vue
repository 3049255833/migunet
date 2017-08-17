<template>
<div class="container">
    <v-Header></v-Header>
    <div class="main-wrapper">
      <div class="nav-wrapper">
        <v-Nav></v-Nav>
      </div>
      <div class="table-wrapper">
        <v-Search hideBtn="true" title="单品管理"></v-Search>
        <v-Table></v-Table>
        <v-Paging></v-Paging>
      </div>
    </div>

</div>
</template>

<script>
import vHeader from '../common/Header'
import vTable  from '../common/Table'
import vNav from '../common/Nav'
import Mock from 'mockjs'
import calendar from '../common/calendar.vue'
import vSearch from '../common/Search'
import vPaging from '../common/Paging'



export default {
  name: 'Home',
  components:{
    vHeader,
    vTable,
    vNav,
    calendar,
    vSearch,
    vPaging
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container{

}
.main-wrapper{
  background: #f4f4f4;
}
.nav-wrapper{
  float: left;
}
.table-wrapper{
  float: left;
  margin-left: 20px;
  width: 1050px;
  background: #ffffff;
  width: 1157px;
  box-sizing: border-box;
  margin-top:20px;
  padding-bottom: 50px;
}
.main-wrapper:after{
  content: '';
  display: block;
  clear: both;
}
.date-wrapper{

}

</style>
