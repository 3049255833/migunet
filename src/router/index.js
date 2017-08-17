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





Vue.use(Router)

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
    }
  ]
})
