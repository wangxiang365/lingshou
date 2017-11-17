import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
const state = {
  ShopList:[],//商家总数据
  NoData: false,
  pageIndex:1,//当前页数
  totalPage:"",//总页数
  OrderBy: "zh",//排序
  O2OTypeId:0,//分类
  CurrentCity:"",//当前城市
  longitude:"",//经度
  latitude:"",//维度
  AreaCode:"",//地区code
  Distance:"",//距离多少米
  BusCityIndex: -1,//商区城市index
  DistanceIndex: -1,//商区距离index
  PlatTypeIndex: -1,//分类index
  dicIndex: -1,//排序index
  Cover: false,//默认和上拉是添加 Nav点击是覆盖
  DiscountSelected:[//全部商家筛选中的"优惠"选项
    {
      types: "yh",
      name: "商家优惠券",
      selected:0
    }
  ],
  ServiceSelected:[//全部商家筛选中的"服务"选项
    {
      types: "fw",
      name: "配送",
      selected:0
    }, {
      types: "fw",
      name: "团购",
      selected:0
    },
  ]
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
