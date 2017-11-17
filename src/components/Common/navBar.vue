<template>
  <div>
    <!--Nav-->
    <div class="navBarBox">
      <div class="navBarList" v-bind:class="navBar.navBarIndex==index?'active':''" v-for="(item,index) in barList" @click="navBarTap($event)" v-bind:data-index="index">
        <span>{{item}}</span>
        <img src="../../assets/images/icon_active.png" v-if="navBar.navBarIndex==index">
        <img src="../../assets/images/icon.png" v-else>
      </div>
    </div>
    <div style="height: .98rem;"></div>
    <!--商区-->
    <div class="BusinessDistrict" v-if="navBar.navBarIndex==0&&navBar.Cover">
      <div class="dropdown_scroller">
        <div>
          <template v-for="(item,index) in navBar.AreaList">
            <div class="BusinessDistrict-list" v-bind:class="BusCityIndex==index?'active':''" @click="DropTasp($event)" v-bind:data-id="item.Id" data-tpes="0"  v-bind:data-index="index">{{item.Name}}</div>
          </template>
        </div>
      </div>
      <div class="dropdown_sub_scroller">
        <div>
          <template v-for="(item,index) in navBar.DistanceList">
            <div class="BusinessDistrict-list" v-bind:class="DistanceIndex==index?'active':''" @click="DropTasp($event)" v-bind:data-id="item.key" data-tpes="1"  v-bind:data-index="index">{{item.value}}</div>
          </template>
        </div>
      </div>
    </div>
    <!--分类-->
    <div class="Classification" v-if="navBar.navBarIndex==1&&navBar.Cover">
      <template v-for="(item,index) in navBar.PlatTypeList">
        <div  v-bind:class="PlatTypeIndex==index?'active':''" @click="DropTasp($event)" v-bind:data-id="item.Id" data-tpes="2"  v-bind:data-index="index">{{item.Name}}</div>
      </template>
    </div>
    <!--排序-->
    <div class="Sort" v-if="navBar.navBarIndex==2&&navBar.Cover">
      <template v-for="(item,index) in navBar.dicList">
        <div v-bind:class="dicIndex==index?'active':''" @click="DropTasp($event)" v-bind:data-id="item.key" data-tpes="3"  v-bind:data-index="index">{{item.value}}</div>
      </template>
    </div>
    <!--筛选-->
    <div class="Screen" v-if="navBar.navBarIndex==3&&navBar.Cover">
      <div class="filterTit">优惠</div>
      <div class="Screen-type">
        <template v-for="(item,index) in DiscountList">
          <div v-bind:class="item.selected==1?'active':''" v-bind:data-type="item.types" v-bind:data-index="index"  @click="SceenTap($event)">{{item.name}}</div>
        </template>
      </div>
      <div class="filterTit">服务</div>
      <div class="Screen-type">
        <template v-for="(item,index) in ServiceList">
          <div  v-bind:class="item.selected==1?'active':''"  v-bind:data-type="item.types" v-bind:data-index="index"  @click="SceenTap($event)">{{item.name}}</div>
        </template>
      </div>
      <div class="Screen-btn">
        <div @click="ResetTap">重置</div>
        <div @click="Complete">完成</div>
      </div>
    </div>
    <!---背景-->
    <div class="navBarBg" v-if="navBar.Cover" @click="navBarBgTap"></div>
  </div>
</template>
<script type="es6">
  import axios from 'axios'//ajax请求
  import urls from '../../Api/Api';//API文件
  export default {
    data () {
      return {
        CurrentCity: "",//当前城市
        barList: ["全部商区", "分类", "智能排序", "筛选"],//nav数据
        navBar: {
          navBarIndex: 0, //导航下标
          Cover: false,//是否点击
          barList: ["全部商区", "分类", "智能排序", "筛选"],
          AreaList: "",//当前城市下的所有区域列表
          DistanceList: "",//距离列表
          PlatTypeList: "",//分类列表
          dicList: "",//排序列表
        },
        latitude: "",////维度
        longitude: "",////经度
        pageIndex: 1,//当前页数
        pageSize: 8,///每页显示几条
        city:null,
      }
    },
    mounted: function () {
      this.getLocation();//获取经纬度信息 并根据经纬度获取数据
      this.latitude=localStorage.latitude;
      this.longitude=localStorage.longitude;
      this.city=localStorage.city;
      //如果存储的经纬度存在就加在存储的否则就重新获取
      if (this.latitude!= null && this.longitude!= null&& this.city!= null) {
        this.Getnavdata();
      } else {
        //重新加载坐标
        this.getLocation();//定位获取数据
      }
    },
    computed: {
      //城市index
      BusCityIndex: {
        get(){//getter
          return this.$store.state.BusCityIndex;
        },
      },
      //距离index
      DistanceIndex: {
        get(){//getter
          return this.$store.state.DistanceIndex;
        },
      },
      //分类index
      PlatTypeIndex: {
        get(){//getter
          return this.$store.state.PlatTypeIndex;
        },
      },
      //排序index
      dicIndex: {
        get(){//getter
          return this.$store.state.dicIndex;
        },
      },
      //优惠列表
      DiscountList:{
        get(){//getter
          return this.$store.state.DiscountSelected;
        },
      },
      //服务列表
      ServiceList:{
        get(){//getter
          return this.$store.state.ServiceSelected;
        },
      },
    },
    methods: {
      aa(){
        alert("父组件调用子组件方法")
      },
      handleParentClick() {
        this.$parent.Alerts2()
      },
      //Nav点击
      navBarTap: function (e) {
        var index = e.currentTarget.dataset.index;
        //console.log(index)
        this.navBar.navBarIndex = index;
        this.navBar.Cover = true;
      },
      //背景点击关闭
      navBarBgTap: function () {
        this.navBar.Cover = false;
      },
      //开始定位
      showPosition(position){
        this.CurrentCity = position.city;
        this.latitude = position.lat;//维度
        this.longitude = position.lng;//经度
        localStorage.latitude=position.lat;//存储维度
        localStorage.longitude=position.lng;//存储经度
        localStorage.city=position.city;//存储城市
        this.$store.dispatch('CurrentCity', position.city);
        this.$store.dispatch('latitude', position.lat);
        this.$store.dispatch('longitude', position.lng);
        this.Getnavdata();//获取nav数据
      },
      //定位失败
      showErr(){
        alert("定位失败")
      },
      //获取经纬度
      getLocation(){
        let that = this;
        let TimeOut = {timeout: 100000};//设置定位超时 10s
        var geolocation = new qq.maps.Geolocation("JO5BZ-FJLCQ-VUJ5N-GL44D-FCBSZ-BXF44", "myapp");
        geolocation.getLocation(that.showPosition, that.showErr, TimeOut);//开启定位
        geolocation.watchPosition(that.showPosition);//监听位置信息的改变
      },
      //获取nav数据
      Getnavdata(){
        let that = this;
        axios.get(urls.GetShopUrlDatas, {
          params: {
            City: that.city,
          },

        }).then(function (res) {
          that.navBar.AreaList = res.data.info.AreaList;//当前城市下的所有区域列表
          that.navBar.DistanceList = res.data.info.DistanceList;//距离列表
          that.navBar.PlatTypeList = res.data.info.PlatTypeList;//分类列表
          that.navBar.dicList = res.data.info.dicList;//排序列表
        }).catch(function (error) {
          //console.log(error);
        });
      },
      //商区、分类、排序下拉点击
      DropTasp: function (e) {
        var index = e.currentTarget.dataset.index;//获取下拉下标
        var tpes = e.currentTarget.dataset.tpes;//获取下拉下标
        var id = e.currentTarget.dataset.id;//获取id
        this.$store.dispatch('DropTap', {
          index,
          tpes,
          id
        });
        this.navBar.Cover = false;
        this.$store.dispatch('NoDatas', false);//保存列表数据
        this.Getlistdata();//获取数据
      },
      //筛选点击
      SceenTap(e) {
        var index = e.currentTarget.dataset.index;
        var tpes = e.currentTarget.dataset.type;
        this.$store.dispatch('SceenTap', {
          index,
          tpes,
        });//保存列表数据
      },
      //重置
      ResetTap() {
        this.DiscountList.forEach(function (ite) {
          ite.selected = 0
        });
        this.ServiceList.forEach(function (ite) {
          ite.selected = 0
        });
      },
      //完成
      Complete() {
        this.navBar.Cover = false;
        this.$store.dispatch('pageIndex', 1);//重置当前页数
        var index=0;
        var tpes="";
        this.$store.dispatch('SceenTap', {
          index,
          tpes,
        });
        this.Getlistdata();//获取数据
      },
      //获取列表数据
      Getlistdata: function () {
        let that = this;
        //显示loading
        that.$vux.loading.show({
          text: '数据加载中'
        })
        that.$store.dispatch('pageIndex', 1);//重置当前页数
        axios.post(urls.GetShopList, {
          Lat: that.latitude,//维度
          Lng: that.longitude,//经度
          pageIndex:that.$store.state.pageIndex,//当前页数
          pageSize:8,///每页显示几条
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
          console.log(res)
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
          let list = res.data.rows;
          that.$store.dispatch('GetBussinessList', list);//保存列表数据
        }).catch(function (error) {
          //console.log(error);
        });
        return that.shopList;
      },
    }
  }
</script>
<style scoped>

</style>
