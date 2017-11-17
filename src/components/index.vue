<template>
  <div>
      <home v-bind:AllData="AllData" v-if="AllData"></home>
  </div>
</template>
<script type="es6">
  import home from '../components/HomeComponent/HomeComponent';//首页组件
  import axios from 'axios'//ajax请求
  import urls from '../Api/Api';//API文件
  export default {
    data () {
      return {
        AllData:[],//所有数据
      }
    },
    mounted:function(){
      this.GetData();//请求数据
    },
    methods: {
      //获取数据
      GetData(){
        let that=this;
        axios.get(urls.homeApi, {
          params: {
            type: 1
          }
        }).then(function (response) {
          let datas = JSON.parse(response.data.info.content);
          let AllDat = "";
          if (datas.PModules.length > 0) {
            AllDat = datas.PModules;
          } if (datas.LModules.length > 0) {
            AllDat = datas.LModules;
          }
          that.AllData=AllDat;
          console.log(AllDat)
        }).catch(function (error) {
          //console.log(error);
        });
      },
    },
    components: {
      home,//首页模板组件
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
