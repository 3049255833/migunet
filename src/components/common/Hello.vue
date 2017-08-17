<template>
  <div class="hello">
    <v-Button text="确定" w="90px"></v-Button>
    <v-Select></v-Select>
  </div>
</template>

<script>
import vButton from '../common/Button'
import vSelect from '../common/Select'
// import Element from 'element-ui'
// import store from './vuex/store.js'
 // Vue.use(Element)


export default {
  name: 'hello',
  components:{
    vButton,
    vSelect

  },
  data () {
    return {
      msg: '我是主页'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
