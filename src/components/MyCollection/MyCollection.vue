<template>
  <div class="box">
    <!--nav-->
    <div class="CuponBar">
        <template v-for="(item,index) in tabBar">
            <div v-bind:class="tabIndex==index?'active':''" @click="tabB(index,item.id)">{{item.txt}}</div>
        </template>
    </div>
    <div style="height:.89rem;"></div>
  </div>
</template>
<script type="es6">
import axios from "axios"; //ajax请求
import urls from "../../Api/Api"; //API文件
export default {
  data() {
    return {
      tabIndex:0,
      tabBar:[
        {
          txt:"店铺",
          id:0
        },
        {
          txt: "资讯",
          id: 2
        }
      ],
    };
  },
  mounted: function() {},
  methods: {
    //tab切换
    tabB(index,id){
      this.Cover=true;
      this.tabIndex=index;
      this.categoryId=id;//0 平台 2商家
      this.page=1;//重置当前页数
    },
  },
  components: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/MyCollection.css"></style>
