<template>
  <div>
   <div v-bind:id="item.type" :key="index" v-for="(item,index) in AllData">
     <!--顶部搜索-->
     <div v-if="item.type==21">
       <!--样式一-->
         <div class="TopSerch" v-bind:class="item.sort==0?'TopFixed':''" v-if="item.content.Stype==0">
           <div class="TopSerch_ser" bindtap="search">
             <span>搜索商家</span>
           </div>
           <div class="TopSerch_mess">
             <img src="http://img.yunchuang365.com/miniAppImg/Mess.png">
           </div>
         </div>
       <!--样式二-->
       <div class="TopSerch2"  v-bind:class="item.sort==0?'TopFixed':''" v-if="item.content.Stype==1||item.content.Stype==2">
         <div class="TopSerch_ser" bindtap="search">
           <span>搜索商家</span>
         </div>
         <div class="TopSerch_mess">
           <img src="http://img.yunchuang365.com/miniAppImg/Mess.png">
         </div>
       </div>
         <div style="height:1rem;" v-if="item.sort==0"></div>
     </div>
     <!--banner-->
     <div v-if="item.type=='Header_style46'">
       <banner v-bind:bandata="item.content.dataset"></banner>
     </div>
     <div v-if="item.type==9">
       <banner v-bind:bandata="item.content.dataset"></banner>
     </div>
     <!--Nav组件-->
     <div v-if="item.type=='Header_style46_nav'">
       <div class="DiyNavBox" v-bind:style="{paddingTop:item.content.modulePadding+'px',paddingBottom:item.content.modulePadding+'px'}">
         <ul>
           <li v-for="(ite,index) in item.content.dataset">
             <div class="NavLisBg">
               <img :src="ite.pic">
             </div>
             <span class="txt">{{ite.showtitle}}</span>
           </li>
         </ul>
       </div>
     </div>
     <!--头条组件-->
     <div v-if="item.type==22">
       <div class="TouTiaoBox">
         <div class="TouTiao_L"><img src="../../assets/images/toutiao.png"></div>
         <div class="TouTiao_MBox" id="TouTiao_MBox">
           <ul class="TouTiao_M" ref="TouTiao" id="TouTiao_M">
             <li  v-for="(ite,index) in item.content.dataset" class="li">
                <a>
                 <div v-if="ite.type==1"><img src="../../assets/images/xt.png"></div>
                 <div v-if="ite.type==2"><img src="../../assets/images/bd.png"></div>
                 <div v-if="ite.type==3"><img src="../../assets/images/sc.png"></div>
                 <div>{{ite.title}}</div>
                </a>
             </li>
           </ul>
           <ul class="TouTiao_M" id="TouTiao_M2"></ul>
         </div>
         <div class="TouTiao_R">MORE</div>
       </div>
     </div>
     <!--橱窗组件-->
     <div v-if="item.type==13">
       <div class="CwBox" v-bind:style="{paddingTop:item.content.modulePadding+'px',paddingBottom:item.content.modulePadding+'px'}">
         <!--样式一-->
         <div class="diy-showcase col2" v-if="item.content.layout==0">
             <template v-for="(ite,inde) in item.content.dataset" v-if="item.content.dataset">
               <a v-bind:href="ite.link" class="con-img bdbox" v-bind:class="'img-'+(inde+1)" v-bind:style="{backgroundImage: 'url(' + ite.pic + ')'}">
                 <div class="info bdbox" v-if="ite.showTitle==1">{{ite.title}}dda</div>
               </a>
             </template>
         </div>
         <!--样式二-->
         <div class="diy-showcase col3" v-if="item.content.layout==1">
           <template v-for="(ite,inde) in item.content.dataset" v-if="item.content.dataset">
             <a v-bind:href="ite.link" class="con-img bdbox" v-bind:class="'img-'+inde+1" v-bind:style="{backgroundImage: 'url(' + ite.pic + ')'}">
               <div class="info bdbox" v-if="ite.showTitle==1">{{ite.title}}dda</div>
             </a>
           </template>
         </div>
       </div>
     </div>















     </div>
  </div>
</template>
<script type="es6">
  import banner from '../../components/Common/banner';//轮播图组件
  import $ from 'jquery';
  export default {
    props:["AllData"],//首页数据
    components:{
      banner,
    },
    mounted(){
      let that=this;
      that.$nextTick(()=>{
        setTimeout(()=>{//新闻上下滚动
          that.NewsMove();
        },2000)
      })
    },
    methods: {
      //新闻滚动
      NewsMove(){
        //新闻上下滚动循环滚动
        var height = $(".TouTiao_M li").height()
        var timer = setInterval(function () {
          if ($(".TouTiao_M li").length >3) {
            $(".TouTiao_M").addClass("moveUp");
            if ($(".TouTiao_M").css("top") < "0px") {
              $(".TouTiao_M li:first-child").appendTo($(".TouTiao_M"));
              $(".TouTiao_M").removeClass("moveUp");
            }
          }
        }, 1000)
      },
    },
  }
</script>
<style src="../../assets/css/index.css"></style>
