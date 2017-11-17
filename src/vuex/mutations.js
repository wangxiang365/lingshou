import * as types from './mutation_type';
export default {
  //商家nav
  [types.NavDropTap] (state,payload) {
    //商区城市点击
    if(payload.tpes==0){
      state.AreaCode=payload.id;//设置选中城市的code
      state.BusCityIndex=payload.index;//设置城市选中的下标
      //重置其他参数
      state.Distance="";
      state.DistanceIndex=-1;
      state.O2OTypeId="";//设置选中分类的值
      state.PlatTypeIndex=-1;//设置选中分类的下标
      state.OrderBy="zh";//设置选中排序的值
      state.dicIndex=0;//设置选中排序的下标
      state.ServiceSelected[0].selected=0;
      state.ServiceSelected[1].selected=0;
      state.DiscountSelected[0].selected=0;
    }
    if(payload.tpes==1){//商区距离点击
      state.Distance=payload.id;//设置选中距离的值
      state.DistanceIndex=payload.index;//设置距离选中的下标
      //重置其他参数
      state.AreaCode="";
      state.BusCityIndex=-1;
      state.O2OTypeId="";//设置选中分类的值
      state.PlatTypeIndex=-1;//设置选中分类的下标
      state.OrderBy="zh";//设置选中排序的值
      state.dicIndex=0;//设置选中排序的下标
      state.ServiceSelected[0].selected=0;
      state.ServiceSelected[1].selected=0;
      state.DiscountSelected[0].selected=0;
    }
    if(payload.tpes==2){//分类点击
      state.O2OTypeId=payload.id;//设置选中分类的值
      state.PlatTypeIndex=payload.index;//设置选中分类的下标
      //重置其他参数
      state.AreaCode="";
      state.BusCityIndex=-1;
      state.Distance="";
      state.DistanceIndex=-1;
      state.OrderBy="zh";//设置选中排序的值
      state.dicIndex=0;//设置选中排序的下标
      state.ServiceSelected[0].selected=0;
      state.ServiceSelected[1].selected=0;
      state.DiscountSelected[0].selected=0;
    }
    if(payload.tpes==3){//排序点击
      state.OrderBy=payload.id;//设置选中排序的值
      state.dicIndex=payload.index;//设置选中排序的下标
      //重置其他参数
      state.AreaCode="";
      state.BusCityIndex=-1;
      state.Distance="";
      state.DistanceIndex=-1;
      state.O2OTypeId="";//设置选中分类的值
      state.PlatTypeIndex=-1;//设置选中分类的下标
      state.ServiceSelected[0].selected=0;
      state.ServiceSelected[1].selected=0;
      state.DiscountSelected[0].selected=0;
    }
  },
  //筛选点击
  [types.SceenTap] (state,payload) {
    if (payload.tpes == "yh") {//优惠
      state.DiscountSelected[payload.index].selected =state.DiscountSelected[payload.index].selected == 0 ? 1 : 0;
    } if (payload.tpes == "fw") {//服务
      state.ServiceSelected[payload.index].selected =state.ServiceSelected[payload.index].selected == 0 ? 1 : 0;
    }
    //重置其他参数
    state.AreaCode="";
    state.BusCityIndex=-1;
    state.Distance="";
    state.DistanceIndex=-1;
    state.O2OTypeId="";//设置选中分类的值
    state.PlatTypeIndex=-1;//设置选中分类的下标
    state.OrderBy="zh";//设置选中排序的值
    state.dicIndex=-1//设置选中排序的下标
  },
  //商家列表
  [types.BussinessList] (state,payload) {
    state.ShopList=payload
  },
  //当前城市
  [types.CurrentCity] (state,payload) {
    state.CurrentCity=payload
  },
/*  //当前地区
  [types.Area] (state,payload) {
    state.AreaCode=payload
  },
  //当前距离
  [types.Distance] (state,payload) {
    state.Distance=payload
  },*/
  //经度
  [types.longitude] (state,payload) {
    state.longitude=payload
  },
  //维度
  [types.latitude] (state,payload) {
    state.latitude=payload
  },
  //当前页数
  [types.pageIndex] (state,payload) {
    state.pageIndex=payload
  },
  //总页数
  [types.totalPage] (state,payload) {
    state.totalPage=payload
  },
  //无数据
  [types.NoDatas] (state,payload) {
    state.NoData=payload
  }
};
