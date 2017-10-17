<template>
    <div class="progress-bar-box" :class="{hide: isHide}">
        <div v-if="uploadErrorInfo == ''">
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width:progressStyle+'%'}">
                </div>
            </div>

            <div class="percent">{{percent}}%</div>

            <div class="count">{{count}}</div>
        </div>
        <div v-else class="text">{{uploadErrorInfo}}</div>
    </div>
</template>

<script>
  export default {
      name: 'ProgressBar',
      props: {
          isHide: Boolean,
          uploadErrorInfo: String,
          percent: String,
          progressStyle: String,
          count: String
      }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .progress-bar-box {
        position: absolute;
        width: 490px;
        top: 120px;
        clear: both;
        left: 300px;
        background: #fff;
        padding: 19px 20px;
        border: 1px solid #ddd;
        border-radius: 6px;
        overflow: hidden;

        &.hide {
            display: none;
        }

        .text {
            text-align: center;
            color: #333333;
            font-size: 14px;
        }

        .progress {
            height: 12px;
            overflow: hidden;
            background-color: #e0e0e0;
            border-radius: 10px;
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
                background-color: #46bafe;
                -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
                box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
                -webkit-transition: width .6s ease;
                -o-transition: width .6s ease;
                transition: width .6s ease;
            }
        }
        .percent {
            margin-left: 10px;
            float: left;
            color: #46bafe;
            font-size: 12px;
        }
        .count {
            float: right;
            color: #46bafe;
            font-size: 12px;
            margin-left: 10px;
        }
    }
</style>
