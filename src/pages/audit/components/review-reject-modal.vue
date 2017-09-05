<template>
    <div class="review-reject-modal">
        <textarea v-model="rejectOpinion"></textarea>
        <div class="btn-group btn-group-center">
            <button v-if="rejectOpinion.length>0" @click="confirm" class="btn btn-primary btn-middle">确定</button>
            <button v-else class="btn btn-primary unable btn-middle">确定</button>
            <div class="btn btn-middle btn-default" @click="cancel">取消</div>
        </div>
    </div>
</template>

<script type="es6">
  export default {
      name: 'ReviewReject',
      props:['modalName'],
      components: {

      },
      data(){
          return{
             rejectOpinion:''
          }
      },
      methods:{
          confirm(){
              this.$emit('rejectOpinionBus',this.rejectOpinion);
          },
          cancel(){
              this.$modal.hide(this.modalName);
          }
      },
      destroyed(){
          this.$off('rejectOpinionBus');
      }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  $image-base-path: '../../../assets/';

  @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
      @if $w and $h {
        width: $w;
        height: $h;
      }
      background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
      background-size: 100% 100%;
  }

  .review-reject-modal {
      text-align: center;
      overflow: hidden;

      textarea {
          margin-top: 20px;
          max-width: 80%;
          width: 80%;
          height: 140px;
          max-height: 140px;
          border-radius: 0;
          padding:10px;
      }
      .btn-group{
          margin-top: 20px;
      }
      
  }
</style>
