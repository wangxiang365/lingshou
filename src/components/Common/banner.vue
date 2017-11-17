<template>
  <!-- swiper -->
  <swiper :options="swiperOption">
    <swiper-slide :key="index" v-for="(img, index) in bandata" v-if="img.pic">
      <img :src="img.pic">
    </swiper-slide>
    <swiper-slide :key="index" v-for="(img, index) in bandata" v-else>
      <img :src="img">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import swipcss from 'swiper/dist/css/swiper.css';
  export default {
    data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 1,//显示几个
        autoplay:2000,
        autoplayDisableOnInteraction : false,//用户操作swiper之后，是否禁止autoplay。
        initialSlide:0,//默认从第几个显示
        //spaceBetween: 30,//banner左右间的间距
        loop:true,//是否循环
        slidesToScroll:3,//每次滚动几个
        direction:'horizontal',//滚动方向 默认为水平滚动('horizontal'),可设置为垂直滚动('vertical')
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  props:["bandata"]
  }
</script>
<style scoped>

</style>
