<template>
  <div>
    <!--navBar-->
    <navBar ref="navBarsss"></navBar>
    <businessList></businessList>
  </div>
</template>

<script type="es6">
  import navBar from '../../components/Common/navBar';//商家列表筛选组件
  import businessList from '../../components/Common/BusinessList';//商家列表组件
    export default {
      components: {
        navBar,//商家列表nav组件
        businessList,
      },
      mounted:function(){

      },

      methods:{
        handleParentClick(){
          this.$refs.navBarsss.aa();
        },
        Alerts(){
          alert("儿子调用父亲方法了")
        },
        Alerts2(){
          alert("儿子调用父亲方法了2")
        },
      },
    }
</script>
<style src="../../assets/css/AllCategories.css"></style>
