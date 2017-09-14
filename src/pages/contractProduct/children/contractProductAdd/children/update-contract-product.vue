<template>
    <div class="contract-product-update-container">
        <div class="update-title">
            合约产品变更信息
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('base')">
                <i class="icon-th-list"></i>
                基本信息
            </div>

            <div class="panel-collapse" v-show="toggleStatus1">
                <v-update-step1></v-update-step1>
            </div>
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('info')">
                <i class="icon-th-list"></i>
                产品权益信息
            </div>

            <div class="panel-collapse" v-show="toggleStatus2">
                <v-update-step2></v-update-step2>
            </div>
        </div>

        <div class="panel-item">
            <div class="panel-heading" @click="toggle('config')">
                <i class="icon-th-list"></i>
                产品关系配置信息
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
            /**
             * 接收变更信息的产品对象
             * */
            this.formData = this.$route.query.plan;

            console.log("formData2: " + JSON.stringify(this.formData));
        },
        destroyed(){
            this.bus.$off('changeInfoBus');
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .contract-product-update-container {
      background-color: #fff;

      .update-title {
          font-size: 14px;
          color: #292c31;
          font-weight: bold;
          line-height: 50px;
          padding-left: 20px;
      }

      .panel-item {
          .panel-heading {
              border: 1px solid #ddd;
              background-color: #ececec;
              padding: 15px 40px;
          }

          .panel-collapse {
              margin: 20px 60px;
          }
      }
  }
</style>
