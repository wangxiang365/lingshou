<template>
    <div class="header">
      <div class="back" v-GoBack>
        <img src="../../assets/images/HisBack.png">
        <span>返回</span>
      </div>
      <div class="tit">{{headerData}}</div>
    </div>
</template>
<script>
  export default {
    props:["headerData"]
  }
</script>
<style scoped>
  .header{
    width:100%;
    max-width: 7.5rem;
    text-align: center;
    line-height: .9rem;
    background: #06c1ac;
    color: #fff;
    font-size: .28rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 300;
    padding: 0 .2rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    z-index: 3000;
  }
  .header .back{
    width: .9rem;
    height: .9rem;
    font-size: .26rem;
  }
  .header .back img{
    width: .26rem;
    height: .26rem;
    vertical-align: middle;
  }
  .header .back  span{
    vertical-align: middle;
  }
  .header .tit{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    -o-box-flex: 1;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: .9rem;
    padding: 0 .4rem;
  }
</style>
