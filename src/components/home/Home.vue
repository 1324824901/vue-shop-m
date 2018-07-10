<template>
  <div class="HomeHome1">
<!-- 搜索头部 -->
    <router-link to='./Search'><mt-search
    placeholder="输入商品名，店铺名"
    ></mt-search></router-link>




    <!-- 上拉下拉 -->
 <div class="page-loadmore-wrapper" ref="wrapper">
    <mt-loadmore 
    :top-method="loadTop" 
    @translate-change="translateChange" 
    @top-status-change="handleTopChange" 
    :bottom-method="loadBottom" 
    @bottom-status-change="handleBottomChange" 
    :bottom-all-loaded="allLoaded" 
    ref="loadmore"
    bottomLoadingText="正在加载..."
    topLoadingText="正在加载..."
    >
<!-- 轮播 -->
    <mt-swipe :auto="3000" class="swipe1">
    <mt-swipe-item v-for="(data,index) in homePageCarouselA" :key="index"><img v-if="data.defaultGoods.goods_main_photo" :src="'http://www.d1sc.com/'+changeData(data.defaultGoods.goods_main_photo.path,data.defaultGoods.goods_main_photo.name)" @click="goto_detailSales(data.defaultGoods.id)"/></mt-swipe-item>
    </mt-swipe>
      <!-- main -->
    <div class="gridAll">
      <div class="grid">
        <div class="UsImg Ha_left">
          <img :src="'http://www.d1sc.com/'+changeData(uSerNamePhoto.photo.path,uSerNamePhoto.photo.name)" v-if="uSerNamePhoto">
          <!-- <img src="../../assets/mIcon/icon_yonghu.png" v-if="uSerNamePhoto==null"> -->
        </div>
        <div class="HomeEp Ha_left">
          <p class="HomeEp1">个性签名</p>
          <p class="HomeEp2">品格是财富,分享能挣钱...</p>
        </div>
        <router-link to="./wanshouProfit">
          <div class="HomeProfit Ha_left">
            <p class="HomeProfitP">盈利排行</p>
            <p class="HomePROImg"><img src="../../assets/mIcon/icon_bonus_list.png" class="gridImg1"></p>
          </div>
        </router-link>
        <router-link to="./sharedGoods">
          <div class="HomeShGoods Ha_left">
            <p class="HomehGoodsP">共享商品</p>
            <span class="HomehGoodsSpan">{{sharedGoodsNumA}}</span>
          </div>
        </router-link>
      </div>

      <div class="grid1">
        <router-link to="./salesVolume">
          <div class="HomesalesVolume">
            <p class="HomeVolumeP1 VolumeLEFT">
              <img src="../../assets/mIcon/icon_sales_list.png" class="gridImg">
            </p>
              <p class="HomeVolumeP VolumeLEFT">{{salesRankA.firstData}}</p>
              <p class="HomeVolumeP2 VolumeLEFT">更多</p>
              <p class="HomeVolumeP3 VolumeLEFT">>></p>
          </div>
        </router-link>
      </div>

      <div class="grid2">
        <ul>
          <li v-for="(itemVolume,index) in salesRankA.secondData" :key="index">
            <div class="HomesalesVolume1" @click="goto_detailSales(itemVolume[0])">
              <img :src="'http://www.d1sc.com/'+changeData(itemVolume[4],itemVolume[5])">
              <p></p>
              <span>￥{{itemVolume[3] | formatMoney()}}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="grid3">
          <p class="HomedailyRecommendImg HomedailyRecommend_left">
            <img src="../../assets/mIcon/icon_market_fushi.png" alt="">
          </p>
          <p class="HomedailyRecommendP HomedailyRecommend_left">{{dailyRecommendA.firstData}}</p>
      </div>
  


      <div class="grid4">
        <swiper :options="swiperOption">

          <swiper-slide class="HomeDailyRecommend1" v-for="(dailyR,index) in dailyRecommendA.secondData" :key="index">
            <p class="HomeDailyRecommend1_1" @click="goto_detailSales(dailyR.defaultGoods.id)">
              <img :src="'http://www.d1sc.com/'+changeData(dailyR.defaultGoods.goods_main_photo.path,dailyR.defaultGoods.goods_main_photo.name)" v-if="dailyR.defaultGoods.goods_main_photo">
            </p>
            <p class="HomeDailyRecommend1_2" @click="goto_detailSales(dailyR.defaultGoods.id)">{{dailyR.defaultGoods.goods_name}}</p>
            <p class="HomeDailyRecommend1_3" @click="goto_detailSales(dailyR.defaultGoods.id)">{{dailyR.defaultGoods.store_price | formatMoney()}}</p>
          </swiper-slide> 
          <p class="swiper-pagination" slot="pagination"></p>
          </swiper>
      </div>

      <div class="grid1 grid5">
        <router-link to="./sharedGoods">
          <div class="HomesalesVolume">
            <p class="HomeVolumeP1 VolumeLEFT">
              <img src="../../assets/mIcon/icon_sales_list.png" class="gridImg">
            </p>
              <p class="HomeVolumeP VolumeLEFT">{{modularDateA.firstData}}</p>
              <p class="HomeVolumeP2 VolumeLEFT">更多</p>
              <p class="HomeVolumeP3 VolumeLEFT">>></p>
          </div>
        </router-link>
      </div>

      <div class="grid6">
        <div class="modularDateA">
          <ul>
            <li v-for="(modular,index) in modularDateA.secondData" :key="index" @click="goto_detailSales(modular.id)">
              <p class="modularDateA_P">
                <img :src="'http://www.d1sc.com/'+changeData(modular.goods_main_photo.path,modular.goods_main_photo.name)" v-if="modular.goods_main_photo">
              </p>
              <p class="modularDateA_P1">{{modular.goods_name}}</p>
              <p class="modularDateA_P2">￥{{modular.store_price | formatMoney()}}</p>
              <p class="modularDateA_P3">销量:{{modular.goods_salenum}}</p>

            </li>
          </ul>
        </div>
      </div>
      
      <div class="grid1 grid7">
        <router-link to="./StrategicCooper">
          <div class="HomesalesVolume">
            <p class="HomeVolumeP1 VolumeLEFT">
              <img src="../../assets/mIcon/icon_sales_list.png" class="gridImg">
            </p>
              <p class="HomeVolumeP VolumeLEFT">{{modularDateB.firstData}}</p>
              <p class="HomeVolumeP2 VolumeLEFT">更多</p>
              <p class="HomeVolumeP3 VolumeLEFT">>></p>
          </div>
        </router-link>
      </div>

      <div class="grid8">
        <div class="modularDateB">
          <ul>
            <li v-for="(modularB,index) in modularDateB.secondData" :key="index" @click="goto_detailSales(modularB.id)">
              <p class="modularDateB_P">
                <img v-if="modularB.goods_main_photo" :src="'http://www.d1sc.com/'+changeData(modularB.goods_main_photo.path,modularB.goods_main_photo.name)">
              </p>
              <p class="modularDateB_P1">{{modularB.goods_name}}</p>
              <p class="modularDateB_P2">￥{{modularB.store_price | formatMoney()}}</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="grid1 grid9">
        <div class="HomesalesVolume">
          <div class="HomeModularDateC">
            <p class="HomeModularDateC1 VolumeLEFT">
              <img src="../../assets/mIcon/like_left.png" class="gridImg">
            </p>
            <p class="HomeModularDateC2 VolumeLEFT">{{modularDateC.firstData}}</p>
            <p class="HomeModularDateC3 VolumeLEFT">
              <img src="../../assets/mIcon/like_right.png" class="gridImg">
            </p>
          </div>
        </div>
      </div>

      <div class="grid10">
        <div class="modularDateA">
          <ul>
            <li v-for="(modularC,index) in modularDateC.secondData" :key="index" @click="goto_detailSales(modularC.id)">
              <p class="modularDateA_P">
                <img v-if="modularC.goods_main_photo" :src="'http://www.d1sc.com/'+changeData(modularC.goods_main_photo.path,modularC.goods_main_photo.name)">
              </p>
              <p class="modularDateA_P1">{{modularC.goods_name}}</p>
              <p class="modularDateA_P2">￥{{modularC.store_price | formatMoney()}}</p>
              <p class="HomeModularDateC4"><button type="button">立即购买</button></p>
            </li>
          </ul>
        </div>
        <div class="modularDateA">
          <ul>
            <li v-for="(modularD,index) in modularDateL" :key="index" @click="goto_detailSales(modularD.id)">
              <p class="modularDateA_P">
                <img v-if="modularD.goods_main_photo" v-lazy="'http://www.d1sc.com/'+changeData(modularD.goods_main_photo.path,modularD.goods_main_photo.name)">
              </p>
              <p class="modularDateA_P1">{{modularD.goods_name}}</p>
              <p class="modularDateA_P2">￥{{modularD.store_price | formatMoney()}}</p>
              <p class="HomeModularDateC4"><button type="button">立即购买</button></p>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>
    </div>
</mt-loadmore>
</div>
<!-- 底部导航 -->
    <div class="tabfoot" >
          <ul class="tabfoot1">
            <li class="footImg1">
              <img src="../../assets/mIcon/ic_homepage_gray.png">
              <img src="../../assets/mIcon/ic_homepage_green.png">
              <p class="footP">万手</p>
            </li>
            <router-link to="./cart"><li class="footImg1">
              <img src="../../assets/mIcon/ic_discover_gray.png">
              <img src="../../assets/mIcon/ic_discover_red.png" class="footImg2">
              <p>购物车</p>
            </li></router-link>
            <router-link to="./my"><li class="footImg1">
              <img src="../../assets/mIcon/ic_person_gray.png">
              <img src="../../assets/mIcon/ic_person_red.png" class="footImg2">
              <p>我的</p>
            </li></router-link>            
          </ul>
    </div>
 
  </div>
</template>
<script>
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
import axios from "axios";
import qs from "qs";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      homePageCarouselA:[],//首页轮播
      sharedGoodsNumA:'',//共享商品
      salesRankA:'',//销量排行头部
      dailyRecommendA:{},//每日推荐
      modularDateA:{},//新品上新
      modularDateB:{},//战略合作
      modularDateC:{},//猜你喜欢
      modularDateL:[],//下拉猜你喜欢
      uSerNamePhoto:'',//用户头像
      id:"",//详情页id
      // userId:"",//用户id
       //上拉下拉==============
      currentPage: 0,
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      translate: 0,
      moveTranslate: 0,
      //上拉下拉==============
      //
      //左右滑动
      swiperOption: {
        slidesPerView:2.5,
        spaceBetween : 12,
        slidesOffsetBefore:15,
        slidesOffsetAfter:15,
        freeMode : true,
        freeModeMomentumRatio : 5,
        },
        //==============
        //
        // name: ''
    };
  },
    //挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
  },
  methods:{
    //数据获取
    //首页数据接口
    goto_detailSales(id) {
      //跳转到详情页
      console.log(id);
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: { id: id }
      });
    },
    
    path() {
      axios
        .post("/getHomePageDates.htm", qs.stringify({
          userId:this.userid,
        }))
        .then(res => {
          console.log(res);
          this.homePageCarouselA = res.data.result.homePageCarousel;//首页轮播
          this.sharedGoodsNumA = res.data.result.sharedGoodsNum;//共享商品
          this.salesRankA = res.data.result.salesRank;//销量排行
          this.dailyRecommendA = res.data.result.dailyRecommend;//每日推荐
          this.modularDateA = res.data.result.modularDate[0];//新品上新
          this.modularDateB = res.data.result.modularDate[1];//战略合作
          this.modularDateC = res.data.result.modularDate[2];//战略合作
          this.uSerNamePhoto = res.data.result.user;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
     //上拉下拉==================================================================================================
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
    },
    translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
        setTimeout(() => {
          this.path(1);
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
    loadBottom() {
      setTimeout(() => {
        if(this.modularDateL!=null){
        this.currentPage++;
        this.LoderPath();
          }else {
            this.allLoaded = true;
          }
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },
    
    //==================================================================================================================
    LoderPath() {
      axios
        .post("/getHomePageDates.htm", qs.stringify({
          userId:this.userid,
          currentPage:this.currentPage
        }))
        .then(res => {
          console.log(res);
          this.modularDateL = this.modularDateL.concat(res.data.result.modularDate[0].secondData);//猜你喜欢
          console.log(this.modularDateL);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created(){
    //打开页面首先自动获取一次数据
      this.path();
  },
  mounted(){
      let uname = getCookie('searchValue');
      this.name = uname
      console.log(this.name);
      if(uname == ""){
        this.$router.push('/');
      }
      this.changeData();//判断图片路径的全局函数；
    },
};
</script>
<style lang="scss">
.HomeHome1{
  //头部搜索
  .mint-search {
    position: fixed;
    top: 0;
    z-index: 999;
    height: 1.5rem;
    background: #f59a53;
    width: 100%;
    .mint-searchbar {
      background: 0rem;
      height: 0.93rem;
      width: 8.88rem;
      padding: 0;
      margin: 0.29rem 1.32rem 0.28rem 0.6rem;
      .mint-searchbar-inner {
        width: 100%;
        opacity: 0.5;
        .mintui-search:before {
          width: 0.43rem;
          height: 0.56rem;
        }
        .mint-searchbar-core {
          margin-left: 0.5rem;
        }
      }
    }
  }
  //首页轮播
  .mint-swipe {
    height: 5.52rem;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicators {
      .is-active {
        background: #e96e06;
      }
    }
  }
  //个人信息
  .gridAll{
    .grid {
      border-bottom: 0.15rem solid #f9f9f9;
      height: 1.76rem;
      width: 100%;
      background:url("../../assets/mIcon/HomeBack.png");
      background-size: 100% 100%;
      position: absolute;
      top: 6.3rem;
      .Ha_left{
        float: left;
      }
      .UsImg{
        height: 1.08rem;
        width: 1.08rem;
        border-radius: .2rem .2rem .2rem .2rem;
        margin-left: .42rem;
        margin-top: .47rem;
        img{
          border-radius:.2rem .2rem;
        }
      }
      .HomeEp{
        width: 4.97rem;
        margin-top:.64rem;
        margin-left:.58rem;
        p{
          font-size:.32rem;
        }
        .HomeEp1{
          color:#17a4e9;
        }
        .HomeEp2{
          color:#4c4c4c;
          width: 100%;
        }
      }
      .HomeProfit{
          height: 1.23rem;
          width: 1.8rem;
          border-left:.03rem solid #f2f2f2;
          margin-top:.52rem;
          .HomeProfitP{
            text-align:center;
            font-size:.28rem;
            color:#e57009;
            margin-bottom: .18rem;
          }
          .HomePROImg{
            width: .6rem;
            height: .63rem;
            margin:auto;
          }
      }
      .HomeShGoods{
          margin-top:.52rem;
          width: 1.89rem;
          height: 1.23rem;
          text-align:center;
          border-left:.03rem solid #f2f2f2;
          .HomehGoodsP{
            margin-top:.05rem;
            margin-bottom:.24rem;
            color:#e57009;
            font-size:.28rem;
          }
          .HomehGoodsSpan{
            color:#e57009;
            font-size:.28rem;
          }
      }
    }
    .grid1{
        height: 1.59rem;
        width: 100%;
        margin-top: 1.2rem;
        .HomesalesVolume{
          height: 1.59rem;
          width: 100%;
          position: relative;
          .VolumeLEFT{
            float: left;
          }
          p{
            line-height:1.59rem;
          }
          .HomeVolumeP1{
            width: .5rem;
            height: .42rem;
            margin:.1rem .27rem 0 .38rem;
          }
          .HomeVolumeP{
            font-size:.37rem;
            color:#333333;
          }
          .HomeVolumeP2{
            font-size:.31rem;
            color:#666666;
            position: absolute;
            right:.86rem;
          }
          .HomeVolumeP3{
            position: absolute;
            right:.39rem;
            color:#9e9e9e;
            font-size:.5rem;
          }
        }
    }
    .grid2{
      height: 5.36rem;
      background:#f2f2f2;
      padding: .17rem .06rem;
      li{
        .HomesalesVolume1{
          position: relative;
          p{
            position: absolute;
            bottom:0;
            height: .54rem;
            width: 100%;
            background: #000;
            opacity: .55;
          }
          span{
            color: #fff;
            position: absolute;
            bottom: 0;
            left: .42rem;
            line-height: .54rem;
            font-size: .2rem;
          }
        }
      }
        :nth-child(1){
          .HomesalesVolume1{
            width: 5.28rem;
            height: 5.3rem;
            float: left;
          }
        }
        :nth-child(2){
          .HomesalesVolume1{
            width: 5.28rem;
            height: 2.6rem;
            margin-bottom:.11rem;
            margin-left:.12rem;
          }
        }
        :nth-child(3){
          .HomesalesVolume1{
            width: 5.28rem;
            margin-left:.12rem;
            height: 2.6rem;
          }
        }
    }
    .grid3{
        height: 1.59rem;
        width: 100%;
        .HomedailyRecommend_left{
          float: left;
        }
        .HomedailyRecommendImg{
          height: .54rem;
          width: .5rem;
          margin-left:.39rem;
          margin-top:.52rem;
        }
        .HomedailyRecommendP{
          font-size:.36rem;
          color:#333333;
          line-height:1.59rem;
          margin-left:.28rem;
        }
    }
    .grid4{
      overflow: hidden;
      height: 6.69rem;
      width: 10.8rem;
      border-top:.12rem solid #f2f2f2;
      border-bottom:.12rem solid #f2f2f2;
      position: relative;
        .HomeDailyRecommend1{
          white-space:nowrap;
          .HomeDailyRecommend1_1{
            height:4.5rem;
            margin-bottom:.61rem;
          }
          .HomeDailyRecommend1_2{
            font-size:.34rem;
            color:#333333;
            margin: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            line-height: 0.5rem;
          }
          .HomeDailyRecommend1_3{
            margin-top:.245rem;
            font-size:.34rem;
            color:#f70303;
          }
        }
    }
    .grid5{
      margin:0;
    }
    .grid6{
      height: 13.9rem;
      width: 100%;
      background:#f2f2f2;
      .modularDateA{
        ul{
          li:nth-child(1){
              margin-right:.12rem;
          }
          li:nth-child(3){
              margin-right:.12rem;
          }
          li{
            float: left;
            background:#fff;
            width: 5.34rem;
            height: 6.77rem;
            margin-top:.12rem;
            position: relative;
            .modularDateA_P{
              width: 5.34rem;
              height: 4.53rem;
            }
            .modularDateA_P1{
              font-size:.34rem;
              color:#343434;
              margin: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              margin-top: .63rem;
              margin-bottom: .49rem;
            }
            .modularDateA_P2{
              color: #f40403;
              font-size: .27rem;
              margin-left: .3rem;
            }
            .modularDateA_P3{
              position: absolute;
              right:.25rem;
              bottom:.5rem;
              color:#6a6a6a;
              font-size: .27rem;
            }
          }
        }
      }
    }
    .grid7{
      margin:0;
    }
    .grid8{
      height: 5.46rem;
      width: 100%;
      background:#f2f2f2;
      .modularDateB{
        ul{
          li:nth-child(1){
              margin-right:.12rem;
          }
          li:nth-child(3){
              margin-right:.12rem;
          }
          li{
            float: left;
            background:#fff;
            width: 5.34rem;
            height: 2.55rem;
            margin-top:.12rem;
            position: relative;
            .modularDateB_P{
              width: 1.29rem;
              height: 1.29rem;
              float:left;
              margin-left:.6rem;
              margin-top:.6rem;
            }
            .modularDateB_P1{
              font-size:.32rem;
              color:#343434;
              margin: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              margin-top: .78rem;
              margin-bottom: .23rem;
              margin-left:2.25rem;
            }
            .modularDateB_P2{
              color: #a0a0a0;
              font-size: .27rem;
              margin-left: 2.31rem;
            }
          }
        }
      }
    }
    .grid9{
      margin:0;
      .HomesalesVolume{
        .HomeModularDateC{
          .HomeModularDateC1{
            height: .12rem;
            width: 1.29rem;
              position: absolute;
              left: 3.09rem;
          }
          .HomeModularDateC2{
              position: absolute;
              left: 4.62rem;
              font-size:.37rem;
              color:#333333;
          }
          .HomeModularDateC3{
              position: absolute;
              right: 3.09rem;
              height: .12rem;
              width: 1.29rem;
          }
        }

      }
    }
    .grid10{
      // height: 13.9rem;
      width: 100%;
      background:#f2f2f2;
      .modularDateA{
        ul{
          li:nth-child(odd){
            // padding-right:.12rem;
            border-top:.12rem solid #f2f2f2;
            border-right:.12rem solid #f2f2f2;
            border-bottom:.12rem solid #f2f2f2;
            } //奇数个div
            li:nth-child(even){
            border-top:.12rem solid #f2f2f2;
            border-bottom:.12rem solid #f2f2f2;
            } //奇数个div
          li{
            float: left;
            background:#fff;
            width: 5.34rem;
            height: 6.77rem;
            position: relative;
            background:#fff;
            .modularDateA_P{
              width: 5.34rem;
              height: 4.53rem;
            }
            .modularDateA_P1{
              font-size:.34rem;
              color:#343434;
              margin: auto;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              margin-top: .63rem;
              margin-bottom: .49rem;
            }
            .modularDateA_P2{
              color: #f40403;
              font-size: .27rem;
              margin-left: .3rem;
            }
            .HomeModularDateC4{
              button{
                border:0;
                background:#f97314;
                width: 1.8rem;
                height: .6rem;
                font-size:.27rem;
                color: #fff;
                outline: none;
                border-radius: .1rem .1rem;
                position: absolute;
                right: .24rem;
                bottom: .3rem;
              }
              
            }
          }
        }
      }
    }
  }
  //底部导航
  .tabfoot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.65rem;
    margin-top: 3.08rem;
    border-top: 0.03rem solid #e0e0e0;
    background: #ffffff;
    z-index:999;
    .tabfoot1 {
      li {
        float: left;
        width: 1.05rem;
        height: 1.22rem;
        margin-left: 1.9rem;
        margin-top: 0.17rem;
        display: inline-block;
        text-align: center;
        position: relative;
        .footImg2 {
          display: none;
        }
        img {
          position: absolute;
          height: 0.67rem;
          width: 0.69rem;
          left: 0.2rem;
        }
        p {
          text-align: center;
          margin-top: 0.9rem;
          color: black;
        }
        .footP {
          color: #e96e04;
        }
      }
    }
  }
  .mint-loadmore-top {
  margin-top: 0rem;
}

.mint-swipe-indicators {
  bottom: 0.03rem;
}

.mint-button-text {
  font-size: 0.15rem;
  line-height: .9rem;
}
.mint-loadmore-bottom{
  margin-bottom: 0;
}
}
.clear{
 clear:both;
} 
</style>
