import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
 * hidden: true                   //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                  //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
                                  //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                  //若你想不管路由下面的 children 声明的个数都显示你的根路由
                                  //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* redirect: noredirect            //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'              //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    title: 'title'               //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             //设置该路由的图标
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    noCache: true                //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
**/

export var constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/authorization',
    name: '首页',
    hidden: true,
    meta: { title: '二类电商订单', icon: 'example' }
  },
  {
    path: '/authorization',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    redirect: `/authorization/index`,
    name: '权限中心',
    meta: { title: '权限中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'authorization',
        component: () => import('@/views/home/authorization/authorization'),
        meta: { title: '权限中心', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    hidden: false,
    redirect: `/user/index`,
    component: Layout,
    alwaysShow: false,
    name: '用户中心',
    meta: { title: '用户中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/home/user/user'),
        meta: { title: '用户中心', icon: 'table' }
      }
    ]
  },
  //  h5商品
  {
    path: '/goods',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: '商品中心',
    meta: { title: '商品中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'goods',
        component: () => import('@/views/home/goods/goods'),
        meta: { title: '商品中心', icon: 'table' }
      }
    ]
  },
  {
    path: '/order',
    redirect: `/order/index`,
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: '订单中心',
    meta: { title: '订单中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/home/order/order'),
        meta: { title: '订单中心', icon: 'table' }
      }
    ]
  },
  {
    path: '/data',
    redirect: `/data/index`,
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: '数据中心',
    meta: { title: '数据中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'data',
        component: () => import('@/views/home/data/data'),
        meta: { title: '数据中心', icon: 'table' }
      }
    ]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
