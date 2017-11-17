<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <div v-if="NoData==true" class="NoData">暂无数据</div>
    <div class="BusinessList-lis" v-for="(item,index) in GetList" v-if="NoData==false">
    <!--列表-->
    <div class="BusinessList-lis-li">
      <router-link :to="{ path: '/BusDetail', query: { shopId: item.Id }}">
        <div class="BusinessList-lis-li-l">
          <img v-bind:src="item.ShopLogo" v-if="item.ShopLogo">
          <img src="../../assets/images/defImg.jpg" v-else>
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
      <router-link :to="{ path: '/PreferentialPay', query: { shopId: item.Id,MerchantId:2,ModuleAll:5,Module:6,Prefix:'CYDDZF'}}">
        <div class="increment-list">
          <img src="http://139.199.164.36/miniAppImgFood/Check.png">
          <span>优惠买单</span>
          <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
        </div>
      </router-link>
      <router-link :to="{ path: '/FoodChoose', query: { shopId: item.Id }}" v-if="item.IsTakeSet==true">
        <div class="increment-list">
          <img src="http://139.199.164.36/miniAppImgFood/food.png">
          <span>配送</span>
          <img src="http://139.199.164.36/miniAppImgFood/right-icon.png">
        </div>
      </router-link>
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
        shopLists: [],
        busy:false,
        pageIndex:1,//当前页数
        pageRows:8,//每页显示几条
        totalPage:"",//总页数
      }
    },
    computed: {
      //获取商家列表数据
      GetList: {
        get(){//getter
          return this.$store.state.ShopList;
        },
      },
      OrderBy: {
        get(){//getter
          return this.$store.state.OrderBy;
        },
      },
      NoData: {
        get(){//getter
          return this.$store.state.NoData;
        },
      },
    },
    mounted: function () {
      this.Getlistdata();
    },
    methods: {
      Getlistdata: function () {
        let that = this;
        //显示loading
        that.$vux.loading.show({
          text: '数据加载中'
        })
        that.$store.dispatch('pageIndex', 1);//重置当前页数
        axios.post(urls.GetShopList, {
          Lat: that.$store.state.latitude,//维度
          Lng: that.$store.state.longitude,//经度
          pageIndex:that.$store.state.pageIndex,//当前页数
          pageSize: that.pageRows,///每页显示几条
          IndustryId: 2,//行业id
          OrderBy: that.$store.state.OrderBy,//排序
          O2OTypeId: that.$store.state.O2OTypeId,//分类的id
          IsCoupons: that.$store.state.DiscountSelected[0].selected,//优惠券
          IsVouchers: that.$store.state.ServiceSelected[1].selected,//是否团购
          Distance: that.$store.state.Distance,//距离多少米
          City: that.$store.state.CurrentCity,//当前城市
          Area: that.$store.state.AreaCode,//地区code
          IsTake: that.$store.state.ServiceSelected[0].selected,//是否外卖
          PriceBegin: 0,//开始价格
          PriceEnd: -1,//结束价格
        }).then(function (res) {
          console.log(res.data.rows)
          that.busy = false;//重置busy状态
          that.$vux.loading.hide();//隐藏loading
          //判断是否有数据
          if (res.data.rows.length == 0) {
            ;
            that.$store.dispatch('NoDatas', true);//保存列表数据
          } else {
            that.$store.dispatch('NoDatas', false);//保存列表数据
          }
          if (res.data.rows) {
            //星级处理
            res.data.rows.forEach(function (ite) {
              if (ite.ShopScore != undefined && ite.ShopScore != null) {
                if (ite.ShopScore > 0 && ite.ShopScore >= 20) {
                  //有等级
                  var Levels = parseInt(ite.ShopScore / 20);
                  ite.ShopScore = Levels;
                }
              }
            })
          }
          that.pageIndex=that.pageIndex+1;//当前页数
          that.$store.dispatch('pageIndex', that.pageIndex);//重置当前页数
          that.$store.dispatch('totalPage', res.data.totalPage);//重置总页数
          that.shopLists = that.shopLists.concat(res.data.rows);
          that.$store.dispatch('GetBussinessList', that.shopLists );//保存列表数据
        }).catch(function (error) {
          //console.log(error);
        });
      },
      loadMore() {
        this.busy = true;//加载状态
        this.Cover = false;//改变点击状态
        console.log(this.$store.state.pageIndex)
        console.log(this.$store.state.totalPage)
        if (this.$store.state.pageIndex > this.$store.state.totalPage) {
          return;
        }
        this.Getlistdata();
      },
    }
  }
</script>
<style scoped>

</style>
