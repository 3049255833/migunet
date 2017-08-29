<template>
  <div class="operate-success-container clearfix" :class="{hide: isHideOperateModal}">
      <img src="../../assets/icon-pass.png">

      <div class="text">{{type}}成功！</div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'OperateSuccess',
    props: {
      type: String,
      isHideOperateModal: Boolean,
    },
    mounted(){
      //console.log(this.operateType + "," + this.operateType);
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .operate-success-container {
      text-align: center;
      position: absolute;
      top: 160px;
      background-color: #fff;
      padding: 12px 50px 10px;
      border-radius: 4px;
      right: 500px;
      font-size: 14px;
      box-shadow: 1px 1px 10px 2px #d6e1e5;
      -webkit-box-shadow: 1px 1px 10px 2px #d6e1e5;
      -moz-box-shadow: 1px 1px 10px 2px #d6e1e5;
      color: #6d7684;

      &.hide {
          display: none;
      }

      img, .text {
          float: left;
      }

      .text {
          margin-left: 8px;
      }
  }
</style>
