// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * 引入Vue
 * */
import Vue from 'vue'


/**
 * 页面唯一入口
 * */
import App from './App'

/**
 * 路由配置
 * */
import router from './router'

/**
 * https://monterail.github.io/vuelidate/
 */
import Vuelidate from 'vuelidate'

/**
 * mock数据
 * 可删
 * */
import Mock from 'mockjs'

/**
 * vueResource
 * */
import VueRosuorce from 'vue-resource'

/**
 * 接口地址统一管理文件
 */
import Api from '@/extend/module/api.js'

/**
 * 全局公用方法
 */
import Utils from '@/extend/module/utils.js'

/**
 * vue.prototype
 */
import VueExtend from '@/extend/module/vue.prototype.extend.js';
Object.keys(VueExtend).forEach(function (context) {
    var options = VueExtend[context];
    Vue.prototype[context] = options
});

/**
 * Array.prototype
 * */
/**
 * 判断数组是否包含指定元素
 * @param  {[type]} needle [description]
 * @return {[type]}        [description]
 */
Array.prototype.contains = function (needle) {
    for (let i in this) {
        if (this[i] == needle) return true;
    }
    return false;
};


/**
 * css reset
 */
import '../static/css/reset.css'

import './scss/index.scss';

/**
 * https://github.com/euvl/vue-js-modal
 */
import Vmodal from 'vue-js-modal'


/**
 * 注册全局插件
 * ajax，router，mock
 * */
Vue.use(VueRosuorce);
Vue.use(Mock);
Vue.use(router);
Vue.use(Vmodal);
Vue.use(Vuelidate);  //注册表单验证

/**
 * 挂载全局参数
 *
 * */
Vue.prototype.bus = new Vue();
Vue.prototype.api = Api;
Vue.prototype.utils = Utils;

/**
 * vue-resource请求拦截器
 */


Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {

    if (request.showLoading) {
        vm.isLoaging = true;
        //延迟2秒必定关闭
        setTimeout(function () {
            vm.isLoaging = false
        }, 2000);
    }


    next((response) => {

        if (request.showLoading) {
            setTimeout(function () {
                vm.isLoaging = false
            }, 500);
        }

    });
});

var vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    data(){
        return {
            isLoaging: false,
        }
    },
    created () {
        this.$router.afterEach(route => {
            setTimeout(function(){
                this.isLoaging = false;
            })
        },1000);

    },
});


/**
 * vue-resource请求拦截器
 */


Vue.component('modal-self', resolve => require(['@/components/modal-self'], resolve));