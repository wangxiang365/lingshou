<template>
  <div class="box">
    <!--无数据-->
    <div class="NoAdd" v-if="AddList.length<=0">
      <img src="http://139.199.164.36/miniAppImg/NoAdd.png">
      <div>还没有收货地址，请添加</div>
    </div>
    <!--列表-->
    <div class="AddressList" v-for="(item,index) in AddList">
      <div class="AddressList-t">
        <div class="AddressList-t-contact">
          <div>{{item.Name}}</div>
          <div>{{item.Phone}}</div>
        </div>
        <div class="AddressList-t-add">
          {{item.AddressText}}
        </div>
      </div>
      <div class="AddressList-b" >
        <div class="AddressList-b-check">
          <div class="Icon"></div>
          <span>默认地址</span>
        </div>
        <div class="AddressList-b-edit" >
          <a href="">
            <img src="http://img.yunchuang365.com/miniAppImg/Edit.png">
            <span>编辑</span>
          </a>
        </div>

     <!--   <div class="AddressList-b-del">
          <img src="http://139.199.164.36/miniAppImg/DelAddDis.png">
          <span style="color:#c0c0c0;">删除</span>
        </div>-->
        <div class="AddressList-b-del">
          <img src="http://139.199.164.36/miniAppImg/DelAdd.png">
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="es6">
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return {
        AddList:[],//所有数据
      }
    },
    mounted:function(){
      this.GetAddList();//获取地址
    },
    methods: {
      //获取地址列表
      GetAddList(){
        let that=this;
        axios.get(urls.GetAddList, {
          params: {
            UserId:"Wx0u3Ut6tKc=",
          }
        }).then(function (res) {
          console.log(res.data.info);
         that.AddList=res.data.info;
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //设置默认地址
      DefaultAddress(e){

      },
    },
    components: {

    },
  }
</script>
<style src="../../assets/css/AddressList.css"></style>
