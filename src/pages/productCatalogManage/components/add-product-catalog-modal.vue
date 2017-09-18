<template>
    <div class="add-product-container">
        <input type="text" placeholder="填写名称" class="form-input" id="name"/>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
    </div>
</template>

<script>
  export default {
      name: 'AddProductContainer',
      methods: {
          confirm() {
              let name = document.getElementById("name").value;

              this.bus.$emit('addCatalog', name);
          }
      }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .add-product-container {
        text-align: center;

        input {
            margin: 25px 0;
            width: 240px !important;
        }
    }
</style>
