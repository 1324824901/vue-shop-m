<template>
    <div>
        <div class="detailShopHead">
            <div class="detailShopHead1">
            <a><div class="detailShopHead1Img" onclick="window.history.go(-1)">
              <img src="../../assets/mIcon/title_back_white.png" alt="">
            </div></a>
            <div class="detailShopHead1Ipt" @click="gotoDetailSearch()">
              <div class="detailShopHead1IptImg">
                <img src="../../assets/mIcon/sousuo.png" alt="">
              </div>
              <input type="text">
              <p>请输入商品名</p>
            </div>
          </div>
          <div class="detailShopHead2" v-if="ShopCaution">
              <div class="detailShopHead2Img">
                  <img :src="'http://www.d1sc.com/'+changeData(ShopCaution.user.photo.path,ShopCaution.user.photo.name)" alt="" v-if="ShopCaution.user.photo!=null"/>
                  <img src="../../assets/mIcon/icon_yonghu.png" alt="" v-if="ShopCaution.user.photo==null||ShopCaution.user==null"/>
              </div>
              <h3>{{ShopCaution.store.store_name}}</h3>
              <p class="detailShopHead2P" v-if="ShopCaution.user!=null">{{ShopCaution.user.userName}} {{ShopCaution.bumen.name}} {{ShopCaution.zhiWei.name}} {{ShopCaution.zhiXian.name}}</p>
          </div>

          <ul class="detailShopHead3">
              <li>
                <p>{{ShopCaution.money}}</p>
                <p>近三个月</p>
              </li>
              <li style='border-left: .02rem solid #fff;border-right: .02rem solid #fff;'>
                <p>{{ShopCaution.sale}}</p>
                <p>销量</p>
              </li>
              <li>
                <p>{{ShopCaution.goodNum}}</p>
                <p>店铺总商品</p>
              </li>
          </ul>
        </div>
        <div class="detailShopSecurity">
          <div class="detailShopSecurityImg">
            <img src="../../assets/mIcon/security.png" alt="">
          </div>
          <p>已缴纳保证金{{ShopCaution.bail}}元，出现问题先行赔付，请勿线下交易！</p>
        </div>
        <!-- 上拉下拉 -->
  <div class="page-loadmore-wrapper" ref="wrapper"><!--:style="{ height: wrapperHeight + 'rem' }" -->
    <mt-loadmore  
      :bottom-method="loadBottom" 
      :bottom-all-loaded="bottomAllLoaded" 
      ref="loadmore" 
      @bottom-status-change="handleBottomChange" 
      :auto-fill="false"
      >
      <div class="detailShopMain" v-for="(data,index) in ShopList" :key="index">
        <li>
          <p class="detailShopMainP" v-if="data.gc!=null">{{data.gc.className}}</p>
          <p class="detailShopMainP" v-if="data.gc==null">无类别</p>
          <p class="detailShopMainP1" @click="goto_detailMore(ShopCaution.user.id,data.gc.id)" v-if="data.gc">更多…</p>
          <div class="detailShopMainImg">
            <img v-lazy="'http://www.d1sc.com/'+changeData(data.goods_main_photo.path,data.goods_main_photo.name)" alt="" @click="goto_detail(data.id)" v-if="data.goods_main_photo!=null"/>
            <img src="../../assets/mIcon/img_ac_sales_list_bg.png" alt="" @click="goto_detail(data.id)" v-if="data.goods_main_photo==null"/>
          </div>
          <p class="detailShopMainP2">{{data.goods_name}}</p>
          <div class="detailShopMainPriceBtn">
            <span class="detailShopSupplyPrice">供货价：</span>
            <span class="detailShopSupplyPrice1">￥ {{data.store_price | formatMoney()}}</span>
            <span class="detailShopVolume">销量：{{data.goods_salenum}}</span>
            <span class="detailShopMainBtn"  @click="goto_detail(data.id)"><button>立即购买</button></span>
          </div>
        </li>
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
      ShopCaution: "", //保证金和头部个人信息
      ShopList: [], //商品列表
      storeId: "", //取到本身的id
      id: "", //跳转详情页id
      aId: "", //跳转到detailMore
      bId: "",
      //上拉下拉==============
      currentPage: 0,
      bottomAllLoaded: false
      // wrapperHeight: 0
      //上拉下拉==============
    };
  },
  mounted() {
    this.personalMal();
    this.personalMall();
  },
  methods: {
    //上拉下拉==================================================================================================
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    gotoDetailSearch() {
      this.$router.push({
        path: "/detailSearch",
        name: "detailSearch",
        params: { storeId: this.storeId }
      });
    },
    loadBottom() {
      setTimeout(() => {
        this.currentPage++;
        this.personalMall();
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },

    goto_detailMore(aId, bId) {
      //跳转到detailMore
      this.$router.push({
        path: "/detailMore",
        name: "detailMore",
        params: { storeId: aId, goodsClassId: bId }
      });
    },
    goto_detail(id) {
      //跳转到详情页
      console.log(id);
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: { id: id }
      });
    },
    personalMal() {
      this.storeId = this.$route.params.storeId;
      axios
        .post(
          "/getStoreHomePage.htm",
          qs.stringify({
            storeId: this.$route.params.storeId
          })
        )
        .then(res => {
          console.log(res);
          this.ShopCaution = res.data.result; //保证金和头部个人信息
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    personalMall() {
      axios
        .post(
          "/getStoreHomePage.htm",
          qs.stringify({
            storeId: this.$route.params.storeId,
            currentPage: this.currentPage
          })
        )
        .then(res => {
          console.log(res);
          this.ShopList = this.ShopList.concat(res.data.result.goods); //商品列表
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang='scss'>
.detailShopHead {
  background: #ccc;
  position: relative;
  .detailShopHead1 {
    height: 2.26rem;
    .detailShopHead1Img {
      top: 0.47rem;
      left: 0.36rem;
      position: absolute;
      width: 0.36rem;
      height: 0.6rem;
    }
    .detailShopHead1Ipt {
      .detailShopHead1IptImg {
        top: 0.5rem;
        left: 1.75rem;
        position: absolute;
        width: 0.43rem;
        height: 0.57rem;
      }
      input {
        top: 0.31rem;
        left: 1.5rem;
        position: absolute;
        width: 7.5rem;
        height: 1rem;
        border: 0;
        outline: none;
        border-radius: 0.1rem;
        opacity: 0.5;
      }
      p {
        top: 0.53rem;
        left: 2.43rem;
        position: absolute;
        color: #fff;
        font-size: 0.34rem;
      }
    }
  }

  .detailShopHead2 {
    position: relative;
    height: 2.12rem;
    .detailShopHead2Img {
      position: absolute;
      left: 0.36rem;
      width: 1.47rem;
      height: 1.47rem;
    }
    h3 {
      position: absolute;
      color: #fff;
      font-size: 0.5rem;
      left: 2.38rem;
      top: 0.12rem;
    }
    .detailShopHead2P {
      position: absolute;
      font-size: 0.28rem;
      color: #fff;
      left: 2.38rem;
      top: 0.75rem;
    }
  }

  .detailShopHead3 {
    height: 0.92rem;
    li {
      width: 3.5rem;
      float: left;
      line-height: 0.4rem;
      height: 0.92rem;
      p {
        font-size: 0.31rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}

.detailShopSecurity {
  position: relative;
  height: 0.68rem;
  line-height: 0.68rem;
  background: #f97314;
  .detailShopSecurityImg {
    top: 0.08rem;
    left: 0.24rem;
    position: absolute;
    width: 0.36rem;
    height: 0.38rem;
  }
  p {
    font-size: 0.32rem;
    margin-left: 0.78rem;
    color: #fff;
  }
}

.detailShopMain {
  li {
    position: relative;
    .detailShopMainP,
    .detailShopMainP1 {
      position: absolute;
      background: #ff5700;
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      color: #fff;
      font-size: 0.31rem;
      top: 0.24rem;
    }
    .detailShopMainP {
      width: 1.6rem;
      padding: 0 0.2rem;
      overflow: hidden;
    }
    .detailShopMainP1 {
      width: 1.5rem;
      border-radius: 0.6rem 0 0 0.6rem;
      right: 0;
    }
    .detailShopMainImg {
      height: 5.25rem;
      width: 100%;
    }
    .detailShopMainP2 {
      height: 1.25rem;
      font-size: 0.42rem;
      padding: 0 0.05rem 0 0.43rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 0.65rem;
    }
    .detailShopMainPriceBtn {
      position: relative;
      padding-left: 0.36rem;
      padding-right: 0.24rem;
      height: 1.08rem;
      .detailShopVolume {
        margin-left: 0.8rem;
      }
      .detailShopSupplyPrice,
      .detailShopVolume {
        font-size: 0.33rem;
        line-height: 1.08rem;
        color: #797979;
      }
      .detailShopSupplyPrice1 {
        font-size: 0.48rem;
        color: #ee422c;
      }
      .detailShopMainBtn {
        button {
          position: absolute;
          width: 2.56rem;
          height: 0.92rem;
          background: #f97314;
          border: 0;
          border-radius: 0.1rem;
          font-size: 0.38rem;
          color: #fff;
          right: 0.24rem;
        }
      }
    }
  }
}
</style>
