<template>
  <div class="box">
    <!--ban-->
    <div class="PreferentialPayMes">
      <img v-bind:src="ShopEntity.ShopLogo">
      <div>{{ShopEntity.ShopName}}</div>
    </div>
    <!--消费金额-->
    <div class="ConsumptionNum">
      <div>
        <span>消费总额:</span>
        <input  type="tel" placeholder="请输入消费金额" v-model="Money" @keyup="KeyChange">
      </div>
    </div>
    <!--列表-->
    <div class="CupponChoose">
      <div class="CupponChoose-list">
        <div>商家优惠券</div>
        <popup-picker  :data="MerchantCoupon" v-model="MerchantCouponValue" :placeholder="MerchantCouponDefValue" @on-change="onChange1"></popup-picker>
        <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
      </div>

      <div class="CupponChoose-list">
        <div>平台优惠券</div>
        <popup-picker  :data="PlatformCoupon" v-model="PlatformCouponValue" :placeholder="PlatformCouponDefValue" @on-change="onChange2"></popup-picker>
        <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
      </div>

      <div class="CupponChoose-list">
        <div>支付方式</div>
        <div class="OccupationList">
          <span class="PayWay">微信支付</span>
        </div>
       <!-- <img src="http://139.199.164.36/miniAppImgFoo0
       d/right-icon.png">-->
      </div>
    </div>
    <!--实付金额-->
    <div class="AmountPaid">
      <span>实付金额</span>
      <span>￥{{totalPrice}}</span>
    </div>
    <div id="GoPay" @click="GoPay">确认买单</div>
  </div>
</template>
<script type="es6">
  import Vue from 'vue'
  import {PopupPicker} from 'vux'
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return {
        Money:"",//input输入
        ShopId: "",
        ShopEntity: "",//商家信息
        MerchantId: "",
        ModuleAll: "",
        Module: "",
        Prefix: '',
        MerchantCoupon: [],//商家优惠券下拉列表
        MerchantCouponList:[],//
        PlatformCoupon:[],//平台优惠券下拉列表
        PlatformCouponList:[],//
        MerchantCouponDefValue:"请选择商家优惠券",//商家优惠券默认选中值
        PlatformCouponDefValue:"请选择平台优惠券",//平台优惠券某认值
        MerchantCouponValue: [],//商家优惠券选中选中值(默认要为空)
        PlatformCouponValue:[],//平台优惠券选中值(默认要为空)
        MerchantCouponId: 0,//商家优惠券id
        PlatformCouponId: 0,//平台优惠券ID
        InputAmount: 0,//键盘输入的金额
        SJYHPrice: 0,//商家优惠金额
        PTYHPrice: 0,//平台优惠金额
        totalPrice: 0,//总价
        Flag: true,//控制订单
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.ShopId = this.$route.query.shopId;//获取shopId
        this.MerchantId = this.$route.query.MerchantId//获取MerchantId
        this.ModuleAll = this.$route.query.ModuleAll;//获取ModuleAll
        this.Module = this.$route.query.Module;//获取Module
        this.Prefix = this.$route.query.Prefix;//获取Prefix
        this.GetShopEntity();//请求数据
      })
    },
    methods: {
      GetShopEntity(){
        let that = this;
        axios.get(urls.GetShopEntity, {
          params: {
            ShopId: that.ShopId
          }
        }).then(function (res) {
          console.log(res);
          if (res.data.status == true){
            that.ShopEntity=res.data.info
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //键盘输入
      KeyChange(){
        if(this.Money==""){
          this.$vux.alert.show({
            title: '提示',
            content:"请输入正确金额",
          })
          this.Money="";
          //this.Getpropertychange();//键盘输入获取商家优惠券和平台优惠券
          return;
        }
        this.Getpropertychange();//键盘输入获取商家优惠券和平台优惠券
      },
      //获取商家优惠券和平台优惠券
      Getpropertychange(){
        let that = this;
        axios.get(urls.GetOrderCouponsList, {
          params: {
            ShopId: that.ShopId ? that.ShopId:77,
            Price: that.Money,//价格
            UserId:"Wx0u3Ut6tKc=",
            MerchantId: that.MerchantId,
            ModuleAll: that.ModuleAll,
            Module: that.Module
          },
        }).then(function (res) {
          if(res.data.info){
            that.MerchantCoupon=[];
            that.MerchantCouponList=res.data.info;
            console.log(that.MerchantCouponList)
            let list=[];
            res.data.info.forEach((ite)=>{
              list.push(ite.Title)
            })
            if(list.length>0){
              that.MerchantCoupon.push(list);
            }
            if (res.data.info.length>0){
              that.MerchantCouponDefValue = res.data.info[0].Title;//默认选中的优惠券的标题
              that.MerchantCouponId = res.data.info[0].Id;
              that.SJYHPrice = res.data.info[0].Price;//默认选中的优惠券的金额
            }else{
              that.MerchantCouponDefValue = "请选择商家优惠券";
              that.SJYHPrice=0;
              that.MerchantCouponId=0;
            }
            that.totalPrice = that.Money - that.SJYHPrice - that.PTYHPrice
            that.totalPrice = Math.round(that.totalPrice * 100) / 100
            console.log(JSON.stringify(that.MerchantCoupon, null, 4))
            that.LoadPlatCoupons();//加载平台现金券，并且重新计算价格
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //加载平台现金券，并且重新计算价格
      LoadPlatCoupons(){
        let that = this;
        var Price = that.Money-1;//输入的总金额-商家优惠的金额
        axios.get(urls.GetOrderCouponsList, {
          params: {
            ShopId: 0,
            Price: Price,
            UserId:"Wx0u3Ut6tKc=",
            MerchantId: that.MerchantId,
            ModuleAll: that.ModuleAll,
            Module: that.Module,
          },
        }).then(function (res) {
          if(res.data.info){
            that.PlatformCoupon=[];
            that.PlatformCouponList=res.data.info;
            let list=[];
            res.data.info.forEach((ite)=>{
              list.push(ite.Title)
            })
            if(list.length>0){
              that.PlatformCoupon.push(list);
            }
            if (res.data.info.length>0){
              that.PlatformCouponDefValue = res.data.info[0].Title;//默认选中的优惠券的标题
              that.PlatformCouponId = res.data.info[0].Id;
              that.PTYHPrice = res.data.info[0].Price;//默认选中的优惠券的金额
            }else{
              that.PlatformCouponDefValue = "请选择平台优惠券";
              that.PTYHPrice=0;
              that.PlatformCouponId=0;
            }
            console.log(JSON.stringify(that.PlatformCoupon, null, 4))
            console.log("ddddddd")
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //商家优惠券选择
      onChange1 (val) {
        let that=this;
        let price="";
        this.MerchantCouponList.forEach((ite,ind)=>{
          if(ite.Title==val[0]){
            this.MerchantCouponId=ite.Id;//获取选择的优惠券的id
            price=ite.Price;//获取选择的优惠券的价格
            that.SJYHPrice=price;//商家优惠券价格
            console.log(this.MerchantCouponId)
          }
        })
        let PriceCoupons=this.Money-price;//输入价格--选中的优惠券的价格
        //重新请求计算平台优惠券
        axios.get(urls.GetOrderCouponsList, {
          params: {
            ShopId: 0,
            Price: PriceCoupons,
            UserId:"Wx0u3Ut6tKc=",
            MerchantId: that.MerchantId,
            ModuleAll: that.ModuleAll,
            Module: that.Module,
          },
        }).then(function (res) {
          if(res.data.info){
            that.PlatformCoupon=[];
            that.PlatformCouponList=res.data.info;
            let list=[];
            res.data.info.forEach((ite)=>{
              list.push(ite.Title)
            })
            if(list.length>0){
              that.PlatformCoupon.push(list);
            }
            if (res.data.info.length>0){
              that.PlatformCouponDefValue = res.data.info[0].Title;//默认选中的优惠券的标题
              that.PlatformCouponId = res.data.info[0].Id;
              that.PTYHPrice = res.data.info[0].Price;//默认选中的优惠券的金额
            }else{
              that.PlatformCouponDefValue = "请选择平台优惠券";
              that.PTYHPrice=0;
              that.PlatformCouponId=0;
            }
            that.totalPrice = that.Money - that.SJYHPrice - that.PTYHPrice
            that.totalPrice = Math.round(that.totalPrice * 100) / 100
          }
        }).catch(function (error) {
          //console.log(error);
        });
        console.log(price)
      },
      //平台优惠券选择
      onChange2 (val) {
        console.log(val[0])
        let that = this;
        let price="";
        this.PlatformCouponList.forEach((ite,ind)=>{
          if(ite.Title==val[0]){
            this.PlatformCouponId=ite.Id;//获取选择的优惠券的id
            that.PTYHPrice=ite.Price;//平台选择优惠券价格
            that.PlatformCouponDefValue=ite.Title;//平台选中优惠券名称
            console.log(this.PlatformCouponId)
          }
        })
        that.totalPrice = that.Money - that.SJYHPrice - that.PTYHPrice
        that.totalPrice = Math.round(that.totalPrice * 100) / 100
      },
      //确认买单
      GoPay(){
        let that=this;
        if(this.Money<=0){
          this.$vux.alert.show({
            title: '提示',
            content:"请输入消费金额d",
          })
          return;
        }
        //创建订单
        axios.post(urls.CreateStoreOrder, {
            Prefix: 'CYDDZF',
            ShopId: that.ShopId,
            Price: that.Money,
            UserId:"Wx0u3Ut6tKc=",
            CouponsId: that.MerchantCouponId,//商家优惠券
            PlatCouponsId: that.PlatformCouponId,//平台优惠券
            PaymentType: 2,
            CashierId: 0
        }).then(function (res) {
          console.log(res)
          if(res.data.status==true){
            that.$vux.alert.show({
              title: '提示:'+res.data.message,
              content:"订单号:"+res.data.OrderNo,
            })
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
    },
    components: {
      PopupPicker,
    },
  }
</script>
<style src="../../assets/css/PreferentialPay.css"></style>
