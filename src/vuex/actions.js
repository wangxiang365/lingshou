import *as types from './mutation_type';

export default {
  ////商区、分类、排序下拉点击
  DropTap({ commit },payload){
    commit(types.NavDropTap,payload);
  },
  //筛选点击
  SceenTap({ commit },payload){
    commit(types.SceenTap,payload);
  },
  GetBussinessList({ commit },payload){
    commit(types.BussinessList,payload);
  },
  NoDatas({ commit },payload){
    commit(types.NoDatas,payload);
  },
  //当前城市
  CurrentCity({ commit },payload){
    commit(types.CurrentCity,payload);
  },
/*  //当前地区
  Area({ commit },payload){
    commit(types.Area,payload);
  },
  //当前距离
  Distance({ commit },payload){
    commit(types.Distance,payload);
  },*/
  //经度
  longitude({ commit },payload){
    commit(types.longitude,payload);
  },
  //维度
  latitude({ commit },payload){
    commit(types.latitude,payload);
  },
  //当前页数
  pageIndex({ commit },payload){
    commit(types.pageIndex,payload);
  },
  //总页数
  totalPage({ commit },payload){
    commit(types.totalPage,payload);
  },
  //商家列表
  GetBussinessList({ commit },payload){
    commit(types.BussinessList,payload);
  },
};

