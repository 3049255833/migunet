<template>
<div class="mask" v-bind:class="{show:isShow}">
  
  <div class="dialog">
    <div class="dialog-head">
      <div class="dialog-title">
        新增产品结果
      </div>
      <div class="close" @click="closeMask">
       
      </div>
      
    </div>
    <div class="dialog-icon">
         <img src="../../assets/success.png" alt="">
      </div>
      <div class="res-title">
        产品新增成功
      </div>
      <div class="res-des">
        你可以去产品中心查看产品信息
      </div>
      <div class="dialog-btn-wrapper">
        
        <div class="dialog-btn" @click="closeMask">
          <Confirm-Button text="确定"></Confirm-Button>
        </div>
        <div class="dialog-btn">
          <CancelButton text="继续新增"></CancelButton>
        </div>
      </div>
    

  </div>
</div>
</template>

<script>

import ConfirmButton from '../common/Button1'
import CancelButton from '../common/Button2'



export default {
  name: 'Pop',
  components:{
    ConfirmButton,
    CancelButton
  },
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    closeMask:function(){
      this.isShow=false;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    color:#333333;
}
.mask.show{
  display: block;
}
.mask.hide{
  display: none;
}
.dialog {
    width: 450px;
    position: absolute;
    top: 280px;
    left: 50%;
    margin-left: -225px;
    border: 1px solid #e1e1e1;
    background: #fff;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 35px;
    box-sizing:border-box;
}

.dialog-title{
  font-size:14px;
  float: left;
}
.close{
  width: 16px;
  height: 16px;
  background: url('../../assets/close.png') no-repeat 0 0;
  background-size: 16px 16px;
  float: right;
  margin-top: 20px;
  cursor: pointer;
}
.res-title{
  font-size:18px;
  text-align: center;
  margin-top: 8px;

}
.res-des{
  font-size:14px;
  color:#666666;
  text-align: center;
  margin-top: 8px;
}
.dialog-head{
  line-height: 58px;
  border-bottom: solid 1px #f0f0f0;
}
.dialog-head:after{
  content:'';
  display: block;
  clear: both;
}
.dialog-icon{
  text-align: center;
  margin-top: 16px;
}
.dialog-btn{
  display: inline-block;
  margin-left: 14px;
}
.dialog-btn-wrapper{
  text-align: center;
  margin-top: 40px;
}
</style>
