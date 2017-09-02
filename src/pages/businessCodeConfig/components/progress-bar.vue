<template>
    <div class="progress-bar-box">
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
            </div>
        </div>

        <div class="count">60%</div>
    </div>
</template>

<script>
  export default {
      name: 'ProgressBar',
      components: {
      },
      methods: {

      },
      mounted () {

      },
      computed: {

      },
      watch: {

      }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .progress-bar-box {
        position: absolute;
        width: 390px;
        top: 120px;
        clear: both;
        left: 300px;
        background: #fff;
        padding: 19px 20px;
        border: 1px solid #ddd;
        border-radius: 6px;
        overflow: hidden;
        display: none;

        .progress {
            height: 12px;
            overflow: hidden;
            background-color: #e0e0e0;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
            box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
            float: left;
            width: 310px;

            .progress-bar {
                float: left;
                width: 0;
                height: 100%;
                font-size: 12px;
                line-height: 20px;
                color: #fff;
                text-align: center;
                background-color: #48baf4;
                -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
                box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
                -webkit-transition: width .6s ease;
                -o-transition: width .6s ease;
                transition: width .6s ease;
            }
        }
        .count {
            float: right;
            color: #6ac4f5;
        }
    }
</style>
