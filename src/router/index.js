import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/pages/home'],resolve) ;
const ContractProduct  = resolve => require(['@/pages/ContractProduct'],resolve) ;
const SingleProduct  = resolve => require(['@/pages/singleProduct'],resolve) ;
const BusinessCodeConfig  = resolve => require(['@/pages/businessCodeConfig'],resolve) ;
const SmsTemplateSetting  = resolve => require(['@/pages/SmsTemplateSetting'],resolve) ;
const productCatalogManage  = resolve => require(['@/pages/productCatalogManage'],resolve) ;
const SingleProductDetail  = resolve => require(['@/pages/singleProduct/children/single-product-detail'],resolve) ;
const ContractProductDetail  = resolve => require(['@/pages/contractProduct/children/contract-product-detail'],resolve) ;
const ContractProductAdd  = resolve => require(['@/pages/contractProduct/children/contractProductAdd'],resolve) ;
const ContractProductUpdate = resolve => require(['@/pages/contractProduct/children/contractProductAdd/children/update-contract-product'],resolve) ;
const Step1 = resolve => require(['@/pages/contractProduct/children/contractProductAdd/children/step-1'],resolve) ;
const Step2 = resolve => require(['@/pages/contractProduct/children/contractProductAdd/children/step-2'],resolve) ;
const Step3 = resolve => require(['@/pages/contractProduct/children/contractProductAdd/children/step-3'],resolve) ;
const TestStep2 = resolve => require(['@/pages/contractProduct/children/contractProductAdd/children/test-step-2'],resolve) ;


/*审核员操作*/
const Audit  = resolve => require(['@/pages/Audit'],resolve) ;       //入口页面
const AuditDetail  = resolve => require(['@/pages/audit/children/audit-detail'],resolve) ;

const ProductAuditManageDetail  = resolve => require(['@/pages/audit/children/audit-detail'],resolve) ;

//审批详情
const MyBacklog  = resolve => require(['@/pages/audit/children/my-backlog'],resolve) ;           //入口页面
const ProductAuditManage  = resolve => require(['@/pages/Audit/children/product-audit-manage'],resolve) ;       //审批管理


/*const Login = resolve => require(['@/pages/login'], resolve);
const SmsLogin = resolve => require(['@/pages/login/children/sms'], resolve);
const AccountLogin = resolve => require(['@/pages/login/children/account'], resolve);*/

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            redirect: '/contract_product',
            children: [
                {
                    path: 'contract_product',
                    name: 'ContractProduct',
                    components: {
                        default: ContractProduct
                    }
                },
                {
                    path: 'contract_product/contract_product_detail/:productCode',
                    name: 'ContractProductDetail',
                    components: {
                        default: ContractProductDetail
                    }
                },
                {
                    path: 'single_product',
                    name: 'SingleProduct',
                    components: {
                        default: SingleProduct
                    }
                },
                {
                    path: 'business_code_config',
                    name: 'BusinessCodeConfig',
                    components: {
                        default: BusinessCodeConfig
                    }
                },
                {
                    path: 'sms_template_setting',
                    name: 'SmsTemplateSetting',
                    components: {
                        default: SmsTemplateSetting
                    }
                },
                {
                    path: 'single_product/single_product_detail/:productUniCode',
                    name: 'SingleProductDetail',
                    component: SingleProductDetail
                },
                {
                    path: 'product_catalog_manage',
                    name: 'productCatalogManage',
                    components: {
                        default: productCatalogManage
                    }
                },
                {
                    path: 'contract_product/contract_product_add',
                    name: 'ContractProductAdd',
                    redirect: 'contract_product/contract_product_add/step1',
                    components: {
                        default: ContractProductAdd
                    },
                    children: [
                        {
                            path: 'step1',
                            name: 'Step1',
                            components: {
                                default: Step1
                            }
                        },
                        {
                            path: 'step2',
                            name: 'Step2',
                            components: {
                                default: Step2
                            }
                        },
                        {
                            path: 'step3',
                            name: 'Step3',
                            components: {
                                default: Step3
                            }
                        },
                        {
                            path: 'test-Step2',
                            name: 'TestStep2',
                            components: {
                                default: TestStep2
                            }
                        },
                    ]
                },
                {
                    path: 'contract_product/contract_product_update',
                    name: 'ContractProductUpdate',
                    components: {
                      default: ContractProductUpdate
                    }
                },

                /*审核员操作*/
                {
                    path: 'audit',
                    name: 'Audit',
                    component: Audit,
                    children:[
                        {
                            path: 'my_backlog',
                            name: 'MyBacklog',
                            components: {
                                default:MyBacklog
                            }
                        },
                        {
                            path: 'my_backlog/audit_detail/:productCode/:auId/:targetStatus',
                            name: 'AuditDetail',
                            components: {
                                default:AuditDetail
                            }
                        },
                        {
                            path: 'product_audit_manage',
                            name: 'ProductAuditManage',
                            components: {
                                default:ProductAuditManage
                            }
                        },
                        {
                            path: 'product_audit_manage/audit_detail/:productCode/:auId/:targetStatus',
                            name: 'ProductAuditManageDetail',
                            components: {
                                default:ProductAuditManageDetail
                            }
                        }
                    ]
                },
            ]
        }
    ]
})
