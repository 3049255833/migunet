<template>
  <div class="no-info">
     <img src="./no-data.png" class="img">
     <p class="text-info">{{text}}</p>
  </div>
</template>
<script>
export default {
  props:['text']
}
</script>
<style scoped>
.no-info{
  overflow: hidden;
  width:270px;
  margin:0 auto;
  position: relative;
}
.no-info .img{
  float: left;
}
.no-info .text-info{
  float: left;
  width:130px;
  text-align: left;
  line-height: 1.2;
  color:#999;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform:translateY(-50%);
  -moz-transform:translateY(-50%);
  -ms-transform:translateY(-50%);
}
</style>
