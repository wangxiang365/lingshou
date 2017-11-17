let baseUrl = "https://ls-test.ssl.yunchuang365.net/api/";//定义接口域名
let upkey ="YDT_LS";
function url(){
  //获取首页数据
  this.homeApi=baseUrl + 'home/homejson/?upkey=' + upkey
  //获取全部商家选项卡数据
  this.GetShopUrlDatas = baseUrl + 'Food/GetShopUrlData?upkey=' + upkey
  //获取全部商家列表数据
  this.GetShopList = baseUrl + 'Food/GetShopList?upkey=' + upkey
  //获取用户信息
  this.GetUserInfo = baseUrl + 'users/pgetuserinfo?upkey=' + upkey
  //获取配送、订座 header基本信息
  this.GetShopBasicData = baseUrl + 'Food/GetShopCityTakeawayData?upkey=' + upkey
  //获取配送、订座总数据
  this.GetShopGoodsList = baseUrl + 'Food/GetShopGoodsList?upkey=' + upkey
  //商家商品评论
  this.Comment = baseUrl + 'Retail/GetAllShopComment?upkey=' + upkey
  //获取商家详情数据
  this.GetBusinessDetail = baseUrl + 'Food/GetShopDetails?upkey=' + upkey
  //商家详情加入收藏
  this.MyCollection = baseUrl + 'Collection/InsertCollection?upkey=' + upkey
  //优惠买单获取商家信息
  this.GetShopEntity = baseUrl + 'StorePay/GetShopEntity?upkey=' + upkey
  //优惠买单 获取优惠券信息
  this.GetOrderCouponsList = baseUrl + 'Coupons/GetCouponsList?upkey=' + upkey
  //优惠买单 提交订单
  this.CreateStoreOrder = baseUrl + 'CreateOrder/CreateStoreOrder?upkey=' + upkey
  // 我的优惠券
  this.GetMyCoupon = baseUrl + 'cardcenter/getmycouponslist?upkey=' + upkey
  //获取地址列表
  this.GetAddList = baseUrl + 'MyAddress/QueryAddressList?upkey=' + upkey
}
var urls = new url();
//module.exports =urls ;//法一
export default urls=urls;//法二

