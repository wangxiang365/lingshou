<template>
  <div class="container">
    <!-- 用户基本信息 -->
    <div class="header">
      <div class="tool" id="SetUser">
        <div id="settings">
          <img src="http://img.yunchuang365.com/miniAppImg/setting.png ">
        </div>
        <div id="msg">
          <img src="http://img.yunchuang365.com/miniAppImg/mmsg.png">
        </div>
      </div>
     <img v-bind:src="userInfo.HeadImgUrlExt ? userInfo.HeadImgUrlExt : userInfo.HeadImgUrl">
      <div class="UserMes">
        <span>{{userInfo.NickNameExt ? userInfo.NickNameExt : userInfo.NickName}}</span>
        <div>用户ID:{{userInfo.Id}}</div>
      </div>
    </div>
    <!-- 其他相关 -->
    <div class="other">
      <div>
        <router-link :to="{ path: '/AddressList'}">
          <img src="http://img.yunchuang365.com/miniAppImg/adderssCen.png">
          <span>收货地址</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{ path: '/MyCoupon'}">
          <img src="http://img.yunchuang365.com/miniAppImg/other1.png">
          <span>我的优惠券</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{ path: '/MyCollection'}">
          <img src="http://img.yunchuang365.com/miniAppImg/other2.png">
          <span>我的收藏</span>
        </router-link>
      </div>
      <div>
        <img src="http://img.yunchuang365.com/miniAppImg/other3.png">
        <span>系统设置</span>
      </div>
      <div>
        <img src="http://img.yunchuang365.com/miniAppImg/investment.png">
        <span>商家入驻</span>
      </div>
    </div>



  </div>
</template>
<script type="es6">
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return{
        userInfo:"",//用户信息
      }
    },
    mounted: function () {
      this.GetUserInfo();//获取用户信息
    },
    methods: {
      GetUserInfo: function () {
        let that = this;
        axios.post(urls.GetUserInfo, {
          openid:"o0ioP0SzmpMubCShrBA7XH8g9R9g",//用户openid
        },{
          header: {
            'Accept': 'application/json',
            'token': ''
          },
        }).then(function (res) {
          console.log(res.data.info);
          that.userInfo=res.data.info;
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
<style src="../../assets/css/PerCenter.css">
</style>
