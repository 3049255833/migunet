import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import ContractProduct from '@/pages/ContractProduct'
import SingleProduct from '@/pages/singleProduct'
import BusinessCodeConfig from '@/pages/businessCodeConfig'
import SingleProductDetail from '@/pages/singleProduct/children/single-product-detail'
import ContractProductDetail from '@/pages/contractProduct/children/contract-product-detail'
import ContractProductAdd from '@/pages/contractProduct/children/contractProductAdd'
import Step1 from '@/pages/contractProduct/children/contractProductAdd/children/step-1'
import Step2 from '@/pages/contractProduct/children/contractProductAdd/children/step-2'
import Step3 from '@/pages/contractProduct/children/contractProductAdd/children/step-3'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component: Home,
            redirect: '/contract_product',
            children: [
                {
                    path: 'contract_product',
                    name: 'ContractProduct',
                    components:{
                        default:ContractProduct
                    }
                },
                {
                    path: 'contract_product_detail',
                    name: 'ContractProductDetail',
                    components:{
                        default:ContractProductDetail
                    }
                },
                {
                    path: 'single_product',
                    name: 'SingleProduct',
                    components:{
                        default:SingleProduct
                    }
                },
                {
                    path: 'business_code_config',
                    name: 'BusinessCodeConfig',
                    components:{
                        default:BusinessCodeConfig
                    }
                },
                {
                    path: 'single_product_detail/:productCode',
                    name: 'SingleProductDetail',
                    component:SingleProductDetail

                },
                {
                    path: 'contract_product/contract_product_add',
                    name: 'ContractProductAdd',
                    redirect: 'contract_product/contract_product_add/step1',
                    components:{
                        default:ContractProductAdd
                    },
                    children: [
                        {
                            path: 'step1',
                            name: 'Step1',
                            components:{
                                default:Step1
                            }
                        },
                        {
                            path: 'step2',
                            name: 'Step2',
                            components:{
                                default:Step2
                            }
                        },
                        {
                            path: 'step3',
                            name: 'Step3',
                            components:{
                                default:Step3
                            }
                        }
                    ]
                },
            ]
        },
    ]
})
