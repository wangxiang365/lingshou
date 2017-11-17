<template>
  <div class="box">
    <!--nav-->
    <div class="CuponBar">
      <template v-for="(item,index) in tabBar">
       <div v-bind:class="tabIndex==index?'active':''" @click="tabB(index,item.id)">{{item.txt}}</div>
      </template>
    </div>
    <div style="height:.89rem;"></div>
    <!--内容-->
 <!--   <div id="CouponListBox">dddddd</div>-->
    <swiper :show-dots="false" v-model="tabIndex" id="CouponListBox" height="100%" :threshold="80" @on-index-change="SwiperChange">
      <swiper-item>
        <!--平台-->
        <div class="CuponBox" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <div class="NoCoupon" v-if="NoCouponList">
            <img src="http://img.yunchuang365.com/miniAppImg/NoCoupon.png">
            <span>您暂时还没有优惠券</span>
          </div>
          <div class="CuponList" v-for="(item,index) in CouponList">
            <div class="CuponList-top">
              <div class="CuponList-top-t">
                <span>{{item.Title}}</span>
                <span><span>￥</span>{{item.Price}}</span>
              </div>
              <div class="CuponList-top-b">
                <span>有效期至 {{item.EndTime}}</span>
                <span>满{{item.MinPrice}}可用</span>
              </div>
            </div>
            <div class="CuponList-bot">
              <span>仅限<span class="font-red">{{item.PlatName}}</span>可用</span>
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <!--商家-->
        <div class="BussinessCoupon">
          <div class="NoCoupon" v-if="NoCouponList">
            <img src="http://img.yunchuang365.com/miniAppImg/NoCoupon.png">
            <span>您暂时还没有优惠券</span>
          </div>
          <div class="BussinessCouponList" v-for="(item,index) in CouponList">
            <div class="BussinessCouponList-l">
              <img v-bind:src="item.ShopLogo" v-if="item.ShopLogo">
              <img src="../../assets/images/defImg.jpg" v-else>
            </div>
            <div class="BussinessCouponList-r">
              <div class="BussinessCouponList-r-t">
                <div>{{item.ShopName}}</div>
                <div><span>￥</span>{{item.Price}}</div>
              </div>
              <div class="BussinessCouponList-r-b">
                <div>有效期至{{item.EndTime}}</div>
                <div>满{{item.MinPrice}}可用</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script type="es6">
  import { Swiper,SwiperItem} from 'vux'
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return {
        busy:false,
        tabIndex:0,
        categoryId:0,//0 平台 2商家
        page:1,//当前页
        rows:5,//每页显示几条
        totalPage: -1,//总页数
        CouponList:[],//优惠券数据
        Cover:false,//点击状态
        NoCouponList:false,//无数据
        tabBar:[
          {
            txt:"平台",
            id:0
          },
          {
            txt: "商家",
            id: 2
          }
        ],
      }
    },
    mounted:function(){
      this.GetCouponList();//加载数据列表
    },
    methods: {
      //tab切换
      tabB(index,id){
        this.Cover=true;
        this.tabIndex=index;
        this.categoryId=id;//0 平台 2商家
        this.page=1;//重置当前页数
        this.GetCouponList();//加载数据列表
      },
      //swiper左右滑动事件
      SwiperChange(index){
        this.Cover=true;
        this.tabIndex=index;
        if(index==0){
          this.categoryId=0;//0 平台 2商家
        }if(index==1){
          this.categoryId=2;//0 平台 2商家
        }
        this.page=1;//重置当前页数
        this.GetCouponList();//加载数据列表
      },
      //获取数据列表
      GetCouponList(){
        let that=this;
        that.$vux.loading.show({
          text: '数据加载中'
        })
        axios.get(urls.GetMyCoupon, {
          params: {
            categoryId: that.categoryId,
            UserId:"Wx0u3Ut6tKc=",
            page: that.page,
            rows: that.rows
          }
        }).then(function (res) {
          console.log(res);
          that.busy = false;//重置busy状态
          that.$vux.loading.hide();//隐藏loading
          //判断是否有数据
          if(res.data.rows.length<=0){
            that.NoCouponList=true;
          }else{
            that.NoCouponList=false;
          }
          //时间处理
          res.data.rows.forEach(function (ite) {
            if (ite.EndTime != undefined && ite.EndTime != null) {
              ite.EndTime = ite.EndTime.replace('T', ' ').replace(/-/g, "-").substr(0, 10);
            }
          })
          //总数据
          if (that.Cover) {//如果是点击数据覆盖
            that.CouponList = res.data.rows
            console.log("true")
          }else {
            that.CouponList = that.CouponList.concat(res.data.rows)
            console.log("false")
            console.log(that.CouponList)
          }
          that.page++;//当前页数
          console.log(res.data.totalPage)
          that.totalPage=res.data.totalPage;//总页数


        }).catch(function (error) {
          //console.log(error);
        });
      },
      loadMore() {
        console.log(this.page)
        console.log(this.totalPage)
        this.busy = true;//加载状态
        this.Cover = false;//改变点击状态
        if (this.page > this.totalPage) {
          return;
        }
        this.GetCouponList();
      },
    },
    components: {
      Swiper,
      SwiperItem,
    },
  }
</script>
<style src="../../assets/css/MyCoupon.css"></style>
