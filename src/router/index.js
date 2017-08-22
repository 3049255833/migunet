import Vue from 'vue'
import Router from 'vue-router'
import AddContractProduct from '@/components/AddContractProduct/AddContractProduct'
import AddContractProduct2 from '@/components/AddContractProduct2/AddContractProduct2'
import AddContractProduct3 from '@/components/AddContractProduct3/AddContractProduct3'
import ContractDetail from '@/components/ContractDetail/ContractDetail'
import Reviewed from '@/components/Reviewed/Reviewed'
import Pop from '@/components/common/Pop'
import ContractProduct from '@/components/ContractProduct/ContractProduct'
import Product from '@/components/Product/Product'

import Home from '@/pages/home'
import ContractProduct1 from '@/pages/ContractProduct'
import SingleProduct from '@/pages/singleProduct'
import ProductDetail from '@/pages/singleProduct/children/productDetail'
import Review from '@/pages/contractProduct/children/review'
import ContractProductAdd from '@/pages/contractProduct/children/contractProductAdd'
import Step1 from '@/pages/contractProduct/children/contractProductAdd/children/step-1'
import Step2 from '@/pages/contractProduct/children/contractProductAdd/children/step-2'
import Step3 from '@/pages/contractProduct/children/contractProductAdd/children/step-3'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ContractProduct',
            component: ContractProduct
        },
        {
            path: '/Product',
            name: 'Product',
            component: Product
        },

        {
            path: '/AddContractProduct',
            name: 'AddContractProduct',
            component: AddContractProduct
        },
        {
            path: '/AddContractProduct2',
            name: 'AddContractProduct2',
            component: AddContractProduct2
        },
        {
            path: '/AddContractProduct3',
            name: 'AddContractProduct3',
            component: AddContractProduct3
        },
        {
            path: '/ContractDetail',
            name: 'ContractDetail',
            component: ContractDetail
        },
        {
            path: '/Reviewed',
            name: 'Reviewed',
            component: Reviewed
        },

        {
            path: '/Pop',
            name: 'Pop',
            component: Pop
        },


        {
            path:'/home',
            component: Home,
            redirect: '/home/contract_product',
            children: [
                {
                    path: 'contract_product',
                    name: 'ContractProduct1',
                    components:{
                        default:ContractProduct1
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
                    path: 'review',
                    name: 'Review',
                    components:{
                        default:Review
                    }
                },
                {
                    path: 'product_detail',
                    name: 'ProductDetail',
                    components:{
                        default:ProductDetail
                    }
                },
                {
                    path: 'contract_product_add',
                    name: 'ContractProductAdd',
                    redirect: 'contract_product_add/step1',
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
