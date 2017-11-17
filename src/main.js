// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Common from './assets/js/Common.js'//公共js
import './assets/css/common.css'//公共css
import store from './vuex/store';//引入vuex
import infiniteScroll from 'vue-infinite-scroll'//无限加载
Vue.use(infiniteScroll)
import  { ConfirmPlugin } from 'vux'//引入vux confirm弹窗组件(没有此步调用弹窗会报undefined)
import  { LoadingPlugin } from 'vux'
import  { XButton } from 'vux'
import  { AlertPlugin } from 'vux'
import  { ToastPlugin } from 'vux'
import { PopupPicker } from 'vux'
Vue.use(ConfirmPlugin)//使用vux confirm弹窗组
Vue.use(LoadingPlugin)
Vue.use(XButton)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(PopupPicker)
Vue.config.productionTip = false
//定义全局返回函数
Vue.directive("GoBack", {
  bind: function(el) {
    el.addEventListener("click", function() {
      //window.history.back()
      //router.back()
      router.go(-1)
    });
  },
});
//清除cookie
setTimeout(()=>{
  localStorage.clear();
},600000)//十分钟清除
Vue.use(require('vue-wechat-title'))//设置页面标题插件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
// router.push('/MyCollection')//要打开哪个页面

