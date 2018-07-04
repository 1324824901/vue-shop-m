<template>
  <div>

        <!-- 上拉下拉 -->
 <div class="page-loadmore-wrapper" ref="wrapper"><!--:style="{ height: wrapperHeight + 'rem' }" -->
    <mt-loadmore  
    :bottom-method="loadBottom" 
    :bottom-all-loaded="bottomAllLoaded" 
    ref="loadmore" 
    @bottom-status-change="handleBottomChange" 
    :auto-fill="false"
    >
    <div class="sharedd">
      <div class="back-withe shar" onclick="window.history.go(-1)">
        <img src="../../assets/mIcon/title_back_white.png">
      </div>
      <div class="shar"><p>共享商品</p></div>
    </div>
  <div class='share-background'>
    <ul>
      <li class="sharedGoodd"  v-for="(data,index) in sharedGoodsItem" :key="index" @click="goto_detail(data.id)">
        <div class="shareGooddImg">
          <img v-lazy="'http://www.d1sc.com/'+changeData(data.goods_main_photo.path,data.goods_main_photo.name)">
        </div>
        <div class="shareGoodP">
          <span>{{data.goods_name}}</span>
          <p class="share-price">￥{{data.store_price | formatMoney()}}</p>
          <p class="share-volume">销量:&nbsp;{{data.goods_salenum}}</p>
        </div>
      </li>
    </ul>
  </div>
     </mt-loadmore>
</div>
<!-- =========================== -->

</div>

</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      sharedGoodsItem: [], //共享商品列表
      id:"",//详情页id
         //上拉下拉==============
      currentPage: 0,
      bottomAllLoaded:false,
      // wrapperHeight: 0
        //上拉下拉==============
    };
  },
  methods: {
  goto_detail(id) {
      //跳转到详情页
      console.log(id);
      this.$router.push({ 
        path: "/detail" ,
        name: 'detail', 
        params: { id:id }
      }); 
    },
     //上拉下拉==================================================================================================
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        this.currentPage++;
        this.path();
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },

    //数据获取
    path() {
      axios
        .post("/appGetShareGoods.htm", qs.stringify({
         currentPage:this.currentPage,
        }))
        .then(res => {
          console.log(res);
          this.sharedGoodsItem =this.sharedGoodsItem.concat(res.data.result);
          console.log(this.sharedGoodsItem);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    //打开页面首先自动获取一次数据
    this.path();
  }
};
</script>
<style>
@import "../../../static/style/css/sharedGoods.css";
.page-loadmore-wrapper {
    overflow: scroll
}
.mint-loadmore-bottom {
    margin-bottom: -1.65rem !important ;
}
</style>
