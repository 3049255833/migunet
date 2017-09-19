<template>
    <div class="contract-product-update-container">
        <div class="update-title">
            合约产品变更信息
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('base')">
                <img src="../../../../../assets/change-info-1.png">

                <div class="toggle-title">产品信息填写</div>

                <i class="arrow" :class="[toggleStatus1 ? 'up' : 'down']"></i>
            </div>

            <div class="panel-collapse" v-show="toggleStatus1">
                <v-update-step1></v-update-step1>
            </div>
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('info')">
                <img src="../../../../../assets/change-info-2.png">

                <div class="toggle-title">产品权益配置</div>

                <i class="arrow" :class="[toggleStatus2 ? 'up' : 'down']"></i>
            </div>

            <div class="panel-collapse" v-show="toggleStatus2">
                <v-update-step2></v-update-step2>
            </div>
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('config')">
                <img src="../../../../../assets/change-info-3.png">

                <div class="toggle-title">产品关系配置</div>

                <i class="arrow" :class="[toggleStatus3 ? 'up' : 'down']"></i>
            </div>

            <div class="panel-collapse" v-show="toggleStatus3">
                <v-update-step3></v-update-step3>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VUpdateStep1 from '../components/update-step-1'
    import VUpdateStep2 from '../components/update-step-2'
    import VUpdateStep3 from '../components/update-step-3'

    export default {
        name: 'ContractProductUpdate',
        data() {
            return{
                formData: {},
                toggleStatus1: true,
                toggleStatus2: false,
                toggleStatus3: false
            }
        },
        components: {
            VUpdateStep1,
            VUpdateStep2,
            VUpdateStep3
        },
        computed: {},
        methods: {
            //切换滑块
            toggle(type) {
                if(type == 'base') {

                    this.toggleStatus1 = !this.toggleStatus1;
                } else if(type == 'info') {

                    this.toggleStatus2 = !this.toggleStatus2;
                } else if(type == 'config') {

                    this.toggleStatus3 = !this.toggleStatus3;
                }
            }
        },
        created(){

        },
        destroyed(){
            //this.bus.$off('changeInfoBus');
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .contract-product-update-container {
      background-color: #fff;
      min-height: 2000px;

      .update-title {
          font-size: 14px;
          color: #292c31;
          font-weight: bold;
          line-height: 50px;
          padding-left: 20px;
      }

      .panel-item {
          margin: 1px 0;

          .panel-heading {
              background-color: #f2f8ff;
              padding: 18px 40px;
              font-size: 14px;
              overflow: hidden;

              img, .toggle-title {
                  float: left;
                  margin: 0 5px;
              }

              .arrow {
                  float: right;
                  margin-right: 20px;
                  width: 15px;
                  height: 10px;

                  &.up {
                      background: url('../../../../../assets/cp-arrow-up.png') no-repeat;
                  }

                  &.down {
                      background: url('../../../../../assets/cp-arrow-down.png') no-repeat;
                  }
              }

              .toggle-title {
                  margin-top: 2px;
              }

              &:hover {
                  background-color: #ccecfe;
              }
          }

          .panel-collapse {
              margin: 20px 60px;
          }
      }
  }
</style>
