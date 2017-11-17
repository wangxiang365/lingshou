<template>
  <div class="box" v-if="AllDatas!=''">
    <div style="position:relative">
      <!---banner--->
      <banner v-bind:bandata="AllDatas.ShopEntity.ShopPic"></banner>
      <!--收藏-->
      <div class="Collection" v-if="AllDatas.IsColl==true&&AllDatas" @click="MyCollection">
        <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/DCollection.png">
        <span>已收藏</span>
      </div>
      <div class="Collection Collectioned" v-if="AllDatas!=''&&AllDatas.IsColl!=true" @click="MyCollection">
        <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/DCollectioned.png">
        <span>收藏</span>
      </div>
    </div>
    <!--基本信息-->
    <div class="BasicMes" v-if="AllDatas!=''">
      <div>
        <span>{{AllDatas.ShopEntity.ShopName}}</span>
        <span> {{AllDatas.TypeName}}</span>
      </div>
      <div v-if="AllDatas.ShopEntity.ShopScore">
        <template v-for="(item,index) in AllDatas.ShopEntity.ShopScore">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Star.png">
        </template>
        <span>销量:{{AllDatas.TotalSales}}</span>
      </div>
    </div>
    <!--地址-->
    <div class="AddMes" v-if="AllDatas!=''">
      <div>
        <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Add.png" @click="OpenMap">
      </div>
      <div @click="OpenMap">{{AllDatas.ShopEntity.AllAddress}}</div>
      <div>
          <a v-bind:href="'tel:'+AllDatas.ShopEntity.Phone" style="display: block;height: .8rem;">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Phone.png">
          </a>
      </div>
    </div>
    <!--nav-->
    <div class="BusinessDetailNav">
      <div v-bind:class="tabBarIndex==index?'active':''" v-for="(item,index) in tabBar" @click="tabBarTap(index)">
        {{item}}
      </div>
    </div>
    <!--商家优惠-->
    <div class="MerchantDiscount" ref="tab0">
      <div class="MerchantDiscount-list">
        <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Check.png">
        <div>
          <span>优惠买单</span>
          <span>已买{{AllDatas.PurchaseCount}}</span>
        </div>
        <router-link :to="{ path: '/PreferentialPay', query: { shopId: AllDatas.ShopEntity.Id,MerchantId:2,ModuleAll:5,Module:6,Prefix:'CYDDZF'}}">
          <div class="GoPay">买单</div>
        </router-link>
      </div>
      <router-link  :to="{ path: '/FoodChoose', query: { shopId: AllDatas.ShopEntity.Id }}">
        <div class="MerchantDiscount-list" v-if="AllDatas.IsTakeSet==true">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/food.png">
          <span class="two">配送</span>
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/right-icon.png">
        </div>
      </router-link>
    </div>
    <!--商家信息-->
    <div class="MerchantInformation" ref="tab2">
      <!--营业时间-->
      <div class="BusinessHours">
        <div class="BusinessHours-list">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/t1.png">
          <div class="BusinessHours-list-r">
            <!-- <view>周一至周五</view> -->
            <div v-if="AllDatas.ShopEntity">{{AllDatas.ShopEntity.WorkTime}}</div>
          </div>
        </div>
        <div class="BusinessHours-list">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/t2.png">
          <div class="BusinessHours-list-r">
            <!-- <view>周一至周五</view> -->
            <div v-if="AllDatas.TakeawaySettingEntity">{{AllDatas.TakeawaySettingEntity.BeginTime}}:00-{{AllDatas.TakeawaySettingEntity.EndTime}}:00</div>
          </div>
        </div>
      </div>
    </div>
    <div class="MerchantInformation" ref="tab3">
      <!--设备设施-->
      <div class="equipment">
      <div class="equipment-tit">配置设施:</div>
      <div class="equipment-ul">
        <div v-if="item!=''" v-for="(item,index) in AllDatas.ShopEntity.ExtFeatureId">
          <div class="equipment-li" v-if="item==1">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s1.png">
            <span>免费停车</span>
          </div>
          <div class="equipment-li" v-if="item==2">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s6.png">
            <span>WIFI</span>
          </div>
          <div class="equipment-li" v-if="item==4">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s4.png">
            <span>刷卡</span>
          </div>
          <div class="equipment-li" v-if="item==3">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s4.png">
            <span>手机支付</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--招聘-->
    <div class="recruit zh">
        <div class="recruit-list">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/yiy.png">
          <span>查看商家营业资质</span>
          <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
        </div>
        <div class="recruit-list">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/ping.png">
          <span>查看商家招聘信息</span>
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/right-icon.png">
        </div>
    </div>
    <!--同城分店-->
    <!--v-if="ShopList.length>0"-->
    <div class="CityBranch">
      <div class="recruit zh" v-if="ShopList.length>0">
        <div class="recruit-list">
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/tcfd.png">
          <span>同城分店</span>
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/right-icon.png">
        </div>
      </div>
      <!--列表-->
      <div class="BusinessList-lis" v-for="(item,index) in ShopList">
        <div class="BusinessList-lis-li">
          <router-link :to="{ path: '/BusDetail', query: { shopId: item.Id }}" append data-v="dd">
            <div class="BusinessList-lis-li-l">
              <img v-bind:src="item.ShopLogo">
             <!-- <img src="../../assets/images/defImg.jpg">-->
            </div>
            <div class="BusinessList-lis-li-r">
              <div>{{item.ShopName}}</div>
              <div>
                <template v-for="(ite,ind) in item.ShopScore">
                  <img src="http://139.199.164.36/miniAppImgFood/Star.png">
                </template>
                <span> 销量:{{item.TotalSales==0?0:item.TotalSales}}</span>
              </div>
              <div>
                <span>{{item.TypeName==null?"":item.TypeName}}</span>
                <span>{{item.Area}}</span>
                <span>{{item.Distance}}</span>
              </div>
            </div>
          </router-link>
        </div>
        <!--增值-->
        <div class="increment">
        <router-link to="">
          <div class="increment-list">
            <img src="http://139.199.164.36/miniAppImgFood/Check.png">
            <span>优惠买单</span>
            <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
          </div>
        </router-link>
        <router-link  :to="{ path: '/FoodChoose', query: { shopId: item.Id }}" v-if="item.IsTakeSet==true">
          <div class="increment-list">
            <img src="http://139.199.164.36/miniAppImgFood/food.png">
            <span>配送</span>
            <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
          </div>
        </router-link>
      </div>
      </div>
    </div>
  </div>
</template>
<script type="es6">
  import banner from '../../components/Common/banner';//轮播图组件
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return {
        AllDatas:[],//所有数据
        ShopList:[],
        latitude:"",
        longitude:"",
        tabBar:["商家优惠","用户评价","商家信息"],
        tabBarIndex:0,
        ShopId:"",
        tabHref:"tab0"
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.ShopId=this.$route.query.shopId;//获取shopId
        this.latitude=localStorage.latitude;
        this.longitude=localStorage.longitude;
        //如果存储的经纬度存在就加在存储的否则就重新获取
        if (this.latitude!= null && this.longitude!= null) {
          this.GetBusinessDetail();
        } else {
          //重新加载坐标
          this.getLocation();//定位获取数据
        }
        if(this.ShopId==""||this.ShopId==null){
          this.$vux.toast.show({
            text: '数据错误'
          })
          setTimeout(()=>{
            history.go(-1)
          },500)
        }
      })
    },
    methods: {
      //根据位置打开地图
      OpenMap(e){
        var Lat =this.latitude;
        var Lng = this.longitude;
        var title = this.AllDatas.ShopEntity.ShopName;
        var addr =this.AllDatas.ShopEntity.AllAddress;
        window.location.href = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + encodeURIComponent(Lat) + "," + encodeURIComponent(Lng) + ";title:" + encodeURIComponent(title) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      },
      //开始定位
      showPosition(position){
        this.latitude = position.lat;//维度
        this.longitude = position.lng;//经度
        localStorage.latitude=position.lat;//存储维度
        localStorage.longitude=position.lng;//存储经度
        this.GetBusinessDetail();//获取详情页数据
      },
      //定位失败
      showErr(){
        alert("定位失败")
      },
      //获取经纬度
      getLocation(){
        let that = this;
        that.$vux.loading.show({
          text: '数据加载中'
        })
        let TimeOut = {timeout: 100000};//设置定位超时 10s
        var geolocation = new qq.maps.Geolocation("JO5BZ-FJLCQ-VUJ5N-GL44D-FCBSZ-BXF44", "myapp");
        geolocation.getLocation(that.showPosition, that.showErr, TimeOut);//开启定位
        geolocation.watchPosition(that.showPosition);//监听位置信息的改变
      },
      GetBusinessDetail(){
        let that=this;
        that.$vux.loading.show({
          text: '数据加载中'
        })
        axios.get(urls.GetBusinessDetail, {
          params: {
            ShopId: that.ShopId ? that.ShopId:16,
            MyLat: that.latitude,
            MyLng: that.longitude,
            UserId:"Wx0u3Ut6tKc=",
          },

        }).then(function (res) {
          that.$vux.loading.hide();//隐藏loading
          if (res.data.status){
            if(res.data.info){
              //星级
              if (res.data.info.ShopEntity.ShopScore != undefined && res.data.info.ShopEntity.ShopScore != null) {
                if (res.data.info.ShopEntity.ShopScore > 0 && res.data.info.ShopEntity.ShopScore>=20){
                  res.data.info.ShopEntity.ShopScore = Math.round(res.data.info.ShopEntity.ShopScore / 20);
                }
              }
              //同城分店
              if (res.data.info.CityShopList.length>0){
                res.data.info.CityShopList.forEach(function(ite){
                  if (ite.ShopScore != undefined && ite.ShopScore != null) {
                    if (ite.ShopScore > 0 && ite.ShopScore >= 20) {
                      ite.ShopScore = Math.round(ite.ShopScore / 20);
                    }
                  }
                })
              }
              //图片
              if (res.data.info.ShopEntity){
                if (res.data.info.ShopEntity.ShopPic){
                  res.data.info.ShopEntity.ShopPic = res.data.info.ShopEntity.ShopPic.split(",")
                }
              }
              //判断配置设置
              if (res.data.info.ShopEntity){
                if (res.data.info.ShopEntity.ExtFeatureId!=null) {
                  res.data.info.ShopEntity.ExtFeatureId = res.data.info.ShopEntity.ExtFeatureId.split(",")
                }
              }
              //评论图片
              if (res.data.info.ShopCommentList.length > 0) {
                res.data.info.ShopCommentList.forEach(function (ite) {
                  if (ite.PicList != undefined && ite.PicList != null) {
                    ite.PicList = ite.PicList.split(",")
                  }
                  //评论时间
                  if (ite.CreateDate != undefined && ite.CreateDate != null) {
                    ite.CreateDate = ite.CreateDate.substring(0,10)
                  }
                })
              }
              that.AllDatas=res.data.info;
              that.ShopList= res.data.info.CityShopList;
            }
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //tab切换
      tabBarTap(index){
        this.tabBarIndex=index;
        let top0=this.$refs.tab0.offsetTop;
        let top2=this.$refs.tab2.offsetTop;
        let top3=this.$refs.tab3.offsetTop;
        if(index==0){
          window.scrollTo(0, top0);
        }if(index==1){
          window.scrollTo(0, top2);
        }if(index==2){
          window.scrollTo(0, top3);
        }
      },
      //收藏
      MyCollection(){
        let that=this;
        axios.get(urls.MyCollection, {
          params: {
            CategoryId: 1,
            UserId:"Wx0u3Ut6tKc=",
            BabyId:that.ShopId ? that.ShopId:77,
          },
        }).then(function (res) {
          console.log(res);
          if(res.data.message=="取消收藏成功"){
            that.$vux.toast.show({
              text: '取消收藏成功'
            })
          }
          if(res.data.message=="加入收藏成功"){
            that.$vux.toast.show({
              text: '加入收藏成功'
            })
          }
          that.GetBusinessDetail();//获取详情数据
          that.$vux.loading.hide();//隐藏loading
        }).catch(function (error) {

        });
      },
      //tab点击跳转
      tabHrefTap(index){
        this.tabHref="tab"+index
      },
    },
    components:{
      banner,
    },
  }
</script>
<style src="../../assets/css/BusDetail.css"></style>
