<template>
  <div class="FoodChooseBox">
    <!--banner-->
<!--    <img src="../../assets/images/seize.png" style="width: 100%;" v-if="basicSte==true">-->
    <div class="RetailShopBan">
      <div class="RetailShopBan_l">
        <img v-bind:src="basicData.ShopEntity.ShopLogo" v-if="basicData">
      </div>
      <div class="RetailShopBan_r">
        <div class="RetailShopBan_r_tit" v-if="basicData">{{basicData.ShopEntity.ShopName}}</div>
        <div class="RetailShopBan_r_m">
          <template v-if="basicData">
            <span v-if="basicData.TakeawaySettingEntity.DistributionLen==1&&basicData">30分钟</span>
            <span v-if="basicData.TakeawaySettingEntity.DistributionLen==2">30分钟</span>
            <span v-if="basicData.TakeawaySettingEntity.DistributionLen==3">60分钟以上</span>
          </template>
          <span v-if="basicData">起送¥{{basicData.TakeawaySettingEntity.FromPrice}}</span>
          <span v-if="basicData">配送¥{{basicData.TakeawaySettingEntity.DeliveryPrice}}</span>
        </div>
        <div class="RetailShopBan_r_sm" id="DescriptionHtml" v-if="basicData">商家说明: {{basicData.TakeawaySettingEntity.Description}}</div>
      </div>
    </div>
    <!--Nav-->
    <div class="ComonlNav">
      <div class="UlBar">
        <template v-for="(item,index) in navBar">
          <div v-bind:class="navBarIndex==index?'active':''" @click="navBarTap(index)">{{item}}</div>
        </template>
      </div>
    </div>
    <!---内容--->
    <div class="ShopBox" v-show="navBarIndex==0">
      <!--left-->
      <div class="RetailShopGoods_l"  ref="menuWrapper">
        <ul class="RetailShopGoods_l_ul">
          <li v-bind:class="MenuIndex==index?'active':''" v-for="(item,index) in AllDatas" v-if="item.foods.length>0" @click="SelectMenu(index,$event)">
            <span class="Active">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!--right-->
      <div class="RetailShopGoods_r" ref="foodWrapper">
        <div>
        <div v-for="(item,index) in AllDatas" class="Lis">
          <div class="Title" v-if="item.foods.length>0">{{item.name}}</div>
          <ul>
            <li v-for="(ite,ind) in item.foods">
              <div class="RetailShopGoods_r_l">
                <img v-bind:src="ite.icon">
              </div>
              <div class="RetailShopGoods_r_r">
                <div class="RetailShopGoods_r_rTit">
                  {{ite.name}}
                </div>
                <div class="RetailShopGoods_r_rNum">
                  已售{{ite.sellCount}}
                </div>
                <div class="RetailShopGoods_r_rMoney">
                  ¥{{ite.Price}}
                </div>
                <div class="C_mid_count_control">
                  <div class="decrease "  v-show="ite.countNum > 0&&ite.Specifications.length<=1" @click="decreaseCart(ite)">
                    <img src="../../assets/images/conAdd.png">
                  </div>
                  <input type="number" class="num"  v-model="ite.countNum"  v-show="ite.countNum > 0&&ite.Specifications.length<=1">
                  <div style="display:inline-block;width:.45rem;height:.45rem; position:relative">
                    <div class="increase" @click="addCart(ite)">
                      <img src="../../assets/images/increase.png">
                    </div>
                  </div>
                </div>
                <div class="ChoseSpec" v-if="ite.Specifications.length>1" @click="ChoseG(ite)">选择规格</div>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>

    </div v-if="navBarIndex==1"v-if="navBarIndex==1">
    <!---评价--->
    <div class="" v-if="navBarIndex==1">
      <div class="NoData" v-if="NoData">暂无数据</div>
      <div class="BusinessList">
        <ul>
          <li v-for="(item,index) in EvaluateDatas">
            <div class="BusinessList_t">
              <div class="BusinessList_t_l"><img v-bind:src="item.UserImg"></div>
              <div class="BusinessList_t_r">
                <div class="BusinessList_t_r_t">
                  <span>{{item.UserName}}</span>
                  <span>{{item.CreateDate}}</span>
                </div>
                <div class="HotelList_r_m_start">
                  <template v-for="(ite,ind) in item.Star">
                    <p><img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Star.png"></p>
                  </template>
                </div>
              </div>
            </div>
            <div class="BusinessList_b">{{item.Contents}}</div>
            <div class="BusinessList_img">
              <template v-for="(ite,ind) in item.PicList">
              <div><img v-bind:src="ite"></div>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!---详情--->
    <div v-show="navBarIndex==2">
      <!--地址-->
      <div class="AddMes"  v-if="basicData">
        <div>
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Add.png" @click="OpenMap">
        </div>
        <div @click="OpenMap">{{basicData.ShopEntity.AllAddress}}</div>
        <div>
          <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/Phone.png">
        </div>
      </div>
      <div class="MerchantInformation">
        <!--营业时间-->
        <div class="BusinessHours">
          <div class="BusinessHours-list">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/t1.png">
            <div class="BusinessHours-list-r">
              <!-- <view>周一至周五</view> -->
              <div v-if="basicData">{{basicData.ShopEntity.WorkTime}}</div>
            </div>
          </div>
          <div class="BusinessHours-list">
            <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/t2.png">
            <div class="BusinessHours-list-r">
              <!-- <view>周一至周五</view> -->
              <div v-if="basicData">{{basicData.TakeawaySettingEntity.BeginTime}}:00-{{basicData.TakeawaySettingEntity.EndTime}}:00</div>
            </div>
          </div>
        </div>
        <!--设备设施-->
        <div class="equipment">
          <div class="equipment-tit">配置设施:</div>
          <div class="equipment-ul" v-if="basicData">
            <template v-if="item!=''" v-for="(item,index) in basicData.ShopEntity.ExtFeatureId">
              <div class="equipment-li" v-if="item==1">
                <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s1.png">
                <span>免费停车</span>
              </div>
              <div class="equipment-li" v-if="item==2">
                <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s6.png">
                <span>WIFI</span>
              </div>
              <div class="equipment-li" v-if="item==3">
                <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s4.png">
                <span>手机支付</span>
              </div>
              <div class="equipment-li" v-if="item==4">
                <img src="http://img.xcx.yunchuang365.net/miniAppImgFood/s4.png">
                <span>刷卡</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!---bottom--->
    <div class="BotCart">
      <div class="CartIcon"  v-bind:class="{'CartIconSelect': totalCount> 0}" @click="ToggCartSelet()">
        <div class="CartNum"  v-show="totalCount> 0 ">{{totalCount}}</div>
        <input type="hidden" v-bind:value="totalCount" ref="tnum"><!--保存总数量-->
        <img src="../../assets/images/CartIco.png">
      </div>
      <div class="BotCart_num">
        <div>￥{{totalPrice}}</div>
        <div>另需配送费￥<span>{{DeliveryPrice}}</span></div>
    </div>
      <div class="BotCart_pay" v-if="totalPrice<FromPrice">还差￥{{Money}}起送</div>
      <div class="BotCart_pay BotCart_paySelet" v-if="totalPrice>=FromPrice&&FromPrice!=-1" @click="GoPay()">去结算</div>
    </div>
    <!---规格弹窗--->
    <div  v-for="(gg,index) in selectSpec" >
      <div class="SpecificationsBoxBg" v-show="gg.guige" @click="CloseBg(gg)" ></div>
      <div class="SpecificationsBox"v-show="gg.guige" v-cloak>
      <div class="SpecificationsBox_tit">{{gg.name}}</div>
      <div class="SpecificationsBox_lis" v-for="gg in selectSpec">
        <h1>规格</h1>
        <div class="SpecificationsBox_lis_list">
          <div v-bind:class="{'act':GListndex === index}" v-for="(item,index) in gg.Specifications"  @click="GList(index)">{{item.SpecName}}</div>
        </div>
      </div>
      <div class="SpecificationsBox_b">
        <div class="SpecificationsBox_b_prie">￥{{gg.Specifications[GListndex].Price}}</div>
        <div class="C_mid_count_control">
          <div class="decrease" @click="decreaseCart(gg)" v-show="gg.Specifications[GListndex].countNum > 0 ">
            <img src="../../assets/images/conAdd.png">
          </div>
          <input type="number" class="num"  v-model="gg.Specifications[GListndex].countNum" v-show="gg.Specifications[GListndex].countNum > 0 ">
          <div style="display:inline-block;width:.45rem;height:.45rem; position:relative">
            <div class="increase" @click="addCart(gg)">
              <img src="../../assets/images/increase.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--选中的商品底部弹窗-->
    <div class="CartBg" v-bind:class="fold&&selectFoods.length>0?'CartBgShow':''" @click="CloseCartBg"></div>
    <div class="CartSelet" v-bind:class="fold&&selectFoods.length>0?'SlideUps':''">
      <div class="CartSelet_tit"  @click="empty"><!--<img src="../images/DelCart.png">-->清空购物车</div>
      <ul>
        <li v-for="food in selectFoods">
          <div class="CartSelet_l">{{food.name}} <span v-if="food.SpecName">({{food.SpecName}})</span></div>
          <div class="CartSelet_m">￥{{food.Price* food.countNum}}</div>
          <div class="C_mid_count_control">
            <div class="decrease" @click="decreaseCart(food)">
              <img src="../../assets/images/conAdd.png">
            </div>
            <input type="number" class="num" v-model="food.countNum">
            <div style="display:inline-block;width:.45rem;height:.45rem; position:relative">
              <div class="increase" @click="addCart(food)">
                <img src="../../assets/images/increase.png">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>







  </div>
</template>

<script type="es6">
  import Vue from 'vue'
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  import BScroll from 'better-scroll'
  export default {
    //GetShopBasicData
    data () {
      return {
        basicData: "",//基本信息
        AllDatas:[],//总数据
        navBar:["商品","评价","详情"],
        navBarIndex:0,
        MenuIndex:0,//左侧分类下标
        menuIndexChange: true,
        listHeight: [],
        fold:false,
        Money:0,
        DeliveryPrice:0,
        FromPrice:-1,
        selectedFoods:[],//选中的商品
        GListndex:0,
        ShopId:"",//shopId
        basicSte:false,//基本数据是否加载完成
        EvaluateDatas:[],//评论数据
        NoData:false,
      }
    },
    mounted: function () {
      this.$nextTick(function(){
        this.ShopId=this.$route.query.shopId;//获取shopId
        this.latitude=localStorage.latitude;
        this.longitude=localStorage.longitude;
        //如果存储的经纬度存在就加在存储的否则就重新获取
        if (localStorage.latitude!= null &&localStorage.longitude!= null) {
          this.Getbasicdata();
        } else {
          //重新加载坐标
          this.getLocation();//定位获取数据
        }
        this.GetAllDatas();//获取总数据
        this.GetEvaluateData();//获取评价数据
      })

    },
    methods: {
      //nav点击
      navBarTap(index){
        this.navBarIndex=index;
      },
      //获取评价数据
      GetEvaluateData(){
        let that = this;
        axios.get(urls.Comment, {
          params: {
            ShopId: that.ShopId ? that.ShopId:16,
            CategoryId: that.CategoryId ? that.CategoryId:0,
            UserId:"Wx0u3Ut6tKc=",
            categoryId:0,
            commentType: 2, //2-配送评价
            GoodsId:0,
            pageIndex:1,//分页
            pageSize: 5,//一页几条
          },
        }).then(function (res) {
          if (res.data.info.length>0) {

            //评论图片
            if (res.data.info[0].CommentList.length > 0) {
              res.data.info[0].CommentList.forEach(function (ite) {
                if (ite.PicList != undefined && ite.PicList != null) {
                  ite.PicList = ite.PicList.split(",")
                }
                if (ite.CreateDate){
                  let arr=ite.CreateDate.split("T")
                  arr[1]= arr[1].split(".")[0]
                  let str = arr[0] +" "+ arr[1]
                  // ite.CreateDate = str
                  ite.CreateDate = arr[0]
                }
              })
              that.NoData=false;
            }else{
              that.NoData=true;
            }
            that.EvaluateDatas=res.data.info[0].CommentList;
            console.log(that.EvaluateDatas)
          }

        }).catch(function (error) {
          //console.log(error);
        });
      },
      //根据位置打开地图
      OpenMap(e){
        var Lat =this.basicData.ShopEntity.Lat;
        var Lng = this.basicData.ShopEntity.Lng;
        var title = this.basicData.ShopEntity.ShopName;
        var addr = this.basicData.ShopEntity.AllAddress;
        window.location.href = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + encodeURIComponent(Lat) + "," + encodeURIComponent(Lng) + ";title:" + encodeURIComponent(title) + ";addr:" + encodeURIComponent(addr) + "&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
      },
      //开始定位
      showPosition(position){
        this.latitude = position.lat;//维度
        this.longitude = position.lng;//经度
        localStorage.latitude=position.lat;//存储维度
        localStorage.longitude=position.lng;//存储经度
        this.Getbasicdata();//获取nav数据
      },
      //定位失败
      showErr(){
        alert("定位失败")
      },
      //获取经纬度
      getLocation(){
        let that = this;
        that.basicSte=true;//基本数据未加载
        let TimeOut = {timeout: 100000};//设置定位超时 10s
        var geolocation = new qq.maps.Geolocation("JO5BZ-FJLCQ-VUJ5N-GL44D-FCBSZ-BXF44", "myapp");
        geolocation.getLocation(that.showPosition, that.showErr, TimeOut);//开启定位
        geolocation.watchPosition(that.showPosition);//监听位置信息的改变
      },
        //获取基本数据
        Getbasicdata(){
          let that = this;
          axios.get(urls.GetShopBasicData, {
            params: {
              ShopId: that.ShopId ? that.ShopId:77,
              MyLat: that.latitude,
              MyLng: that.longitude
            },
          }).then(function (res) {
            console.log(res);
            if(res.data.info){
              //评论图片
              if (res.data.info.ShopCommentList.length > 0) {
                res.data.info.ShopCommentList.forEach(function (ite) {
                  if (ite.PicList != undefined && ite.PicList != null) {
                    ite.PicList = ite.PicList.split(",")
                  }
                })
              }
              that.basicData=res.data.info;
              that.basicSte=false;//基本数据已加载
            }
          }).catch(function (error) {
            //console.log(error);
          });
        },
      //获取总数据
      GetAllDatas(){
        let that = this;
        axios.get(urls.GetShopGoodsList, {
          params: {
            ShopId: that.ShopId ? that.ShopId:16,
            CategoryId: that.CategoryId ? that.CategoryId:0,
          },
        }).then(function (res) {
          //console.log(JSON.stringify(res, null, 4))
          if (res.data.info.goods){
            console.log(res.data.info)
            that.AllDatas=res.data.info.goods;
            that.FromPrice=res.data.info.FromPrice;//配送费
            that.DeliveryPrice=res.data.info.DeliveryPrice;//配送起送价
          }
          that.$nextTick(function () {//数据渲染完成后执行
            that._initScroll()
            that._calculateHeight();
          });
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //better-sroll
      _initScroll: function () {
        var self = this;
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
          probeType: 2,
          bounce: true,
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          click: true,
          bounceTime: 1000,
        });
        this.foodScroll.on('scrollStart', function () {
          self.menuIndexChange = true;
        });
        this.foodScroll.on('scroll', function (pos) {
          //self.scrolly = Math.abs(Math.round(pos.y));
          self.listHeight.forEach(function (item, index) {
            if (self.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              self.MenuIndex = index;
            }
          })
        });
      },
      //遍历所有高度
      _calculateHeight: function () {
        var foodList = this.$refs.foodWrapper.getElementsByClassName('Lis');
        var h = this.$refs.foodWrapper
        var height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          var item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      //左侧按钮点击
      SelectMenu: function (index, event) {
        this.MenuIndex = index;
        var foodList = this.$refs.foodWrapper.getElementsByClassName('Lis');
        var el = foodList[index];
        console.log(el)
        this.foodScroll.scrollToElement(el, 400);
        this.menuIndexChange = false;//menuIndexChange解决运动时listenScroll依然监听的bug
        this.foodScroll.on('scrollEnd', function () {
          this.menuIndexChange = true;
        });
      },
      //购物车数量加
      addCart: function (food) {
        var _self = this;
        var GListndex = this.GListndex;
        //有规格的往规格里面添加num
        if (food.Specifications && food.Specifications.length > 1) {
          if (!food.Specifications[GListndex].countNum) {
            Vue.set(food.Specifications[GListndex], 'countNum', 1);
          } else {
            food.Specifications[GListndex].countNum++;
          }
        } else {//没有规格的往整体添加num
          if (!food.countNum) {
            Vue.set(food, 'countNum', 1);
          } else {
            food.countNum++;
            console.log(food)
          }
          Vue.set(food, 'ShowPopInp', true);
        }
      },
      //购物车数量减
      decreaseCart: function (food) {
        var _self = this;
        var GListndex = this.GListndex;
        if (food.Specifications && food.Specifications.length > 1) {
          food.Specifications[GListndex].countNum--;

          if (food.Specifications[GListndex].countNum == 0) {
            _self.guige = false;
            //_self.ShowPopInp = false;
          }
        } else {
          food.countNum--;
          if (food.countNum <= 0) {
            Vue.set(food, 'ShowPopInp', false);
          }
        }
      },
      //底部购物车图标点击
      ToggCartSelet() {
        if (this.$refs.tnum.value>0) {
          this.fold = !this.fold;
        }
      },
      //购物车背景点击
      CloseCartBg() {
        this.fold = false;
      },
      //选择规格按钮点击
      ChoseG: function (food) {
        if (!food.guige) {
          Vue.set(food, 'guige', "true");
          // console.log(food)
        }
        //console.log(this.selectSpec())
      },
      //规格选择背景点击
      CloseBg: function (food) {
        food.guige = false;
        this.GListndex = 0;
      },
      GList: function (index) {//规格列表active样式切换
        this.GListndex = index;
      },
      //清空购物车
      empty: function () {
        let that=this;
        this.$vux.confirm.show({
          title: '提示',
          content: '确定清空购物车',
          onConfirm () {
            that.selectFoods.forEach(function (food) {
              food.countNum = 0
            })
          }
        })
      },
      //去结算
      GoPay(){
        this.$vux.alert.show({
          title: '提示',
          content:"敬请期待",
          onShow () {

          },
          onHide () {

          }
        })
      },
    },
    //计算属性
    computed: {
      //选中的商品
      selectFoods() {
        var foods = [];
        this.AllDatas.forEach(function (goods,idx) {
          goods.foods.forEach(function (food,ind) {
            if (food.Specifications.length > 1) {
              food.Specifications.forEach(function (item,specIndex) {
                console.log(item)
                if (item.countNum) {
                  item.name = food.name;
                  foods = foods.concat(item)
                }
              })
            } else {
              if (food.countNum) {
                foods = foods.concat(food);
              }
            }
          })
        })
        //如果选中的商品个数为0  fold为false 避免选中的商品底部弹窗操作引起的弹窗显示
        if (foods.length <= 0) {
          this.fold = false;
        }
        return foods;
      },
      //总价
      totalPrice: function () {
        var total = 0;
        var GListndex = this.GListndex;
        this.selectFoods.forEach(function (food, index) {
          total += food.Price * food.countNum;
        })
        this.Money = (this.FromPrice - total).toFixed(2);
        return total.toFixed(2);
      },
      //选的总数量
      totalCount: function () {
        var count = 0;
        this.selectFoods.forEach(function (food) {
          count+=parseInt(food.countNum);
        })
        return count;
      },
      //选中商品的规格
      selectSpec: function () {
        var _self = this;
        var Spec = [];
        _self.AllDatas.forEach(function (goods) {
          goods.foods.forEach(function (food) {
            if (food.guige) {
              Spec.push(food);
            }
          })
        })
        if (Spec.length > 0) {
          _self.guige = true;  //选择了规格
        }
        return Spec;
      },
    },
  }
</script>
<style src="../../assets/css/FoodChoose.css"></style>
