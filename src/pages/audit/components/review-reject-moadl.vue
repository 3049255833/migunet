<template>
    <div class="review-reject-modal">
        <textarea></textarea>

        <button class="btn btn-primary btn-middle">通过</button>
    </div>
</template>

<script type="es6">
  export default {
      name: 'ReviewReject',
      components: {

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
      }

      button {
          float: right;
          margin-right: 34px;
          margin-top: 20px;
      }
  }
</style>
