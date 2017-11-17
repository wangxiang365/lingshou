<template>
  <div id="app">
    <heade v-bind:headerData="headerTitle" v-if="!FilterHeader"></heade>
    <div style="height:.9rem;" v-if="!FilterHeader"></div>
    <!--v-wechat-title="$route.meta.title"设置页面标题-->
 <!--   <keep-alive>-->
    <transition name="fade" mode="out-in">
      <router-view v-wechat-title="$route.meta.title"  :key="key"></router-view>
    </transition>
  <!--  </keep-alive>-->
    <div style="height: 1.03rem;" v-if="FilterUrl"></div>
    <tabBar v-if="FilterUrl"></tabBar>
  </div>
</template>

<script type="es6">
  import tabBar from './components/Common/tabBar'//footer
  import heade from './components/Common/header'//header
  export default {
    data (){
    return{
      Url:['/','/AllCategories','/PerCenter','/MyCoupon'],//显示底部的url
      Herd:['/'],//不显示header的url
      headerTitle:"",//当前路由
      showHeader:false,//是否显示header
    }
  },
  name: 'app',
    components:{
      tabBar,
      heade
  },
  computed: {
    //判断底部是否显示
    FilterUrl () {
      var Url=this.Url;//footer
              this.headerTitle=this.$route.meta.title;//获取当前路由下的title设置header标题
      for(var i=0;i<Url.length;i++){
        if(Url[i].indexOf(this.$route.path)>-1){
          return true;
        }
      }
    },
    //判断header是否显示
    FilterHeader(){
      var Herd=this.Herd;//header
      for(var i=0;i<Herd.length;i++){
        if(Herd[i].indexOf(this.$route.path)>-1){
            return true;
        }
      }
    },
    //处理一个页面中的链接点击再次跳入当前页面(只是后面参数有变化)url变化页面不刷新问题
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
/*  height: 100%;
  overflow: scroll;*/
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0s
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
