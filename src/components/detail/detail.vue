<template>
  <div>
    <div class="detailHead_left detailHeadImg" onclick="window.history.go(-1)">
        <div class="detailHead_left_right_img">
          <img src="../../assets/mIcon/title_back_white.png" alt="" id="img111">
        </div>
      </div>
      <!-- <div class="detailHead_right detailHeadImg">
        <div class="detailHead_left_right_img">
          <img src="../../assets/mIcon/title_back_white.png" alt="" id="img222">
        </div>
      </div> -->

    <div class="detailHead">
        <ul class="detailHead_text">
          <li class="detailHead_text1">宝贝</li>
          <li class="detailHead_text2">评价</li>
          <li class="detailHead_text3">详情</li>
        </ul>
    </div>

      <div class="detailMain">
      
        <div class="detailSwipe aaasss">
              <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(data,index) in detailLbtImg" :key="index">
                    <img :src="'http://www.d1sc.com/'+changeData(data.path,data.name)" v-if="data!=undefined">
                </mt-swipe-item>
              </mt-swipe>
            </div>

          <div class="detailMain1">
            <p class="detailMainP wwww">{{titlePriceSales.goods_name}}</p>
            <div class="detailMainF wwww"   @click="selectionSpecificationShow1()">
                <div class="detailMainImg">
                    <img src="../../assets/mIcon/icon_danbaoren.png" alt="">
                </div>
                <p>分享赚钱</p>
            </div>
          </div>
           <!-- 底部弹框分享 分享赚钱-->
            <div class="detailMain1s_selection1">
                <div class="detailMain1s_selection1Btn1"  @click="selectionSpecificationHide1()">分享到</div>
                <ul class="sharePl">
                  <li>
                    <div class="sharePlus">
                      <div>
                        <img src="../../assets/mIcon/plus.png" alt="">
                      </div>
                    </div>
                    <div class="shareP">加价分享</div>
                  </li>
                  <li>
                    <div class="sharePlus">
                      <div>
                        <img src="../../assets/mIcon/photograph.png" alt="">
                      </div>
                    </div>
                    <div class="shareP">图片分享</div>
                  </li>
                  <li>
                    <div class="sharePlus">
                      <div>
                        <img src="../../assets/mIcon/share.png" alt="">
                      </div>
                    </div>
                    <div class="shareP">分享链接</div>
                  </li>
                </ul>
                <ul class="sharePl2">
                  <li>
                    <div class="sharePlus2">
                        <img src="../../assets/mIcon/QQ.png" alt="">
                    </div>
                    <div class="shareP2">QQ</div>
                  </li>
                  <li>
                    <div class="sharePlus2">
                        <img src="../../assets/mIcon/xinlang.png" alt="">
                    </div>
                    <div class="shareP2">新浪</div>
                  </li>
                  <li>
                    <div class="sharePlus2">
                        <img src="../../assets/mIcon/qqKongjian.png" alt="">
                    </div>
                    <div class="shareP2">QQ空间</div>
                  </li>
                  <li>
                    <div class="sharePlus2">
                        <img src="../../assets/mIcon/weixin1.png" alt="">
                    </div>
                    <div class="shareP2">微信好友</div>
                  </li>
                  <li>
                    <div class="sharePlus2">
                        <img src="../../assets/mIcon/weixinFriend.png" alt="">
                    </div>
                    <div class="shareP2">微信朋友圈</div>
                  </li>
                </ul>
                <div class="detailMain1s_selection1Btn"  @click="selectionSpecificationHide1()">取消</div>
            </div>
          <div class="detailMain1s_selection" @click="selectionSpecificationHide1()"></div>
            <!-- ============================================= -->
          <div class="detailMain2 aaasss">
              <p>供货价: {{titlePriceSales.store_price | formatMoney()}}</p>
              <div class="detailMain2S">
                  <span>建议售价: {{titlePriceSales.goods_price | formatMoney()}}</span>
                  <span>总销量: {{titlePriceSales.goods_salenum}}</span>
              </div>
          </div>

          <div class="detailMain3" @click="selectionSpecificationShow(true)">
              <span class="detailMain3s specification">选择规格</span>
              <span class="detailMain3Img"><img src="../../assets/mIcon/title_back_normal.png" alt=""></span>
          </div>
           <!-- 底部弹框分享选择规格 -->
          <div class="detailMain3s_selection1">
            <!-- //头部 -->
            <div class="detailMain3sSkuHead" @click="selectionSpecificationHide()">
              <div class="detailMain3s_selection1Img">
                <img :src="'http://www.d1sc.com/'+changeData(detailLbtImga.path,detailLbtImga.name)" alt="" v-if="detailLbtImga!=undefined">
              </div>
              <div class="detailMain3sSkuHeadCenter">
                  <p>￥{{titlePriceSales.store_price | formatMoney()}}</p>
                  <p>库存：{{titlePriceSales.goods_inventory}}件</p>
                  <p>已选：{{choosenTypeString}}</p>
              </div>
              <div class="detailMain3s_selection1X">
                <img src="../../assets/mIcon/xx.png" alt="">
              </div>
            </div>
              <!-- 主体二维数组 -->
            <div class="detailMain3sSkuMain">
              <div class="aaax">
                  <ul class="aaaxUl" v-for="(data,index) in specNameList" :key="index">
                    <div class="type-name">{{data}}</div>
                    <li class="type-list">
                      <p v-for="(dataa,indexx) in specProp[index]" :key="indexx" 
                        @click="selectType(index, indexx)" v-bind:class="{ 'type-item': true, 'active': indexx == choosenType[index] }"
                      >{{dataa}}</p>
                    </li>
                  </ul>
            <!--底部 -->
              <div class="detailMain3sSkuFoot">
                <h3 class="detailMain3s_selection1H aH">数量</h3>
                <div class="count aH">
                  <span class="count-btn reduce" @click="detailSign()">-</span>
                  <input class="count-btn countNumber" value="1" readonly="readonly"/>
                  <span class="count-btn add"  @click="detailPlus()">+</span>
                </div>
              </div>
               </div>
            </div>
              <button type="submit" class="detailMain3s_selection1Btn" @click="addToCart()">确定</button>  
            </div>
          <div class="detailMain3s_selection" @click="selectionSpecificationHide()"></div>
          <!-- ============================== -->
          <div class="detailMain4">
              <span class="detailMain3s_selectionSpan">商品评价({{evaluation.evaluateSum}})</span>
               <span class="detailMain3s_selectionSpan1" v-show="evaluation.evaluate"  @click="goto_evaluation(titlePriceSales.id)">查看评价</span>
              <span class="detailMain3s_selectionSpan2"><img src="../../assets/mIcon/title_back_normal.png" alt=""></span>
          </div>

         <div class="detailMain5" v-show="evaluation.evaluate">
            <div class="detailMain5Span">
              <span>好评({{evaluation.praiseNum}})</span>
              <span>中评({{evaluation.commonlyNum}})</span>
              <span>差评({{evaluation.badNum}})</span>
            </div>
            <div class="detailMain5M" v-if="evaluation.evaluate">
              <div class="detailMain5Mimg">
                <img v-if="evaluation.evaluate.user" :src="'http://www.d1sc.com/'+changeData(evaluation.evaluate.user.photo.path,evaluation.evaluate.user.photo.name)">
              </div>
              <span  v-if="evaluation.evaluate.user">{{evaluation.evaluate.user.userName}}</span>
            </div>
            <p class="detailMain5P" v-if="evaluation.evaluate">{{evaluation.evaluate.assessingDiscourse.assessingCharacter}}</p>
          </div>
          <div class="detailMain6 aaasss">
              <div class="detailMain6He">
                  <div class="detailMain6HeImg">
                      <img src="../../assets/mIcon/icon_bonus_list.png" alt="">
                  </div>
                  <div class="detailMain6HeP">
                      <p>{{Merchants.userName}}</p>
                      <p>已缴纳保证金{{evaluation.deposit}}元</p>
                  </div>
                  <button class="detailMainBtn" @click="goto_detailShop(detailShopId.id)">进店逛逛</button>
              </div>
              <div class="detailMain6Ma">
                  <div>
                      <span>卖家服务</span>
                      <span>{{serving.storeAverageScore+'.0 '+ serving.filedExplainShow}}</span>
                  </div>
                  <div>
                      <span>物流服务</span>
                      <span>{{serving.storeExpressAverageScore+'.0 '+ serving.expressSiledExplainShow}}</span>
                  </div>
              </div>
          </div>
          
      </div>

      <div class="detailFoot">
        <div class="detailFootImgP">
            <div>
                <img src="../../assets/mIcon/icon_bonus_list.png" alt=""  @click="goto_detailShop(detailShopId.id)">
            </div>
            <p @click="goto_detailShop(detailShopId.id)">店铺</p>
        </div>
        <div class="detailFootS">
            <span class="specification" @click="selectionSpecificationShow(true)">加入购物车</span>
            <span class="specification"  @click="selectionSpecificationShow(false)">立即购买</span>
        </div>
      </div>
          <iframe  id="myrame" :src="'http://www.d1sc.com/api_goods_detail_view.htm?'+webViewImg" style="margin: 0;padding: 0;height: 15rem; width: 100% !important; border:0;">
          </iframe>
  </div>
  
</template>

<script>
// var iframe = document.getElementById("iframe1");
//  var iwindow = iframe.contentWindow;
//  var idoc = iwindow.document;
// console.log("window",iwindow);//获取iframe的window对象
// console.log("document",idoc);  //获取iframe的document
// console.log("html",idoc.documentElement);//获取iframe的html
// console.log("head",idoc.head);  //获取head
// console.log("body",idoc.body);  //获取body
import axios from "axios";
import qs from "qs";
import { Base64 } from "js-base64";
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      userId: 153351,
      choosenType: {}, // 规格
      choosenTypeString: "", // 显示已选规格内容
      goodsCount: 1, // 数量
      gspString: "",
      isAddToCart: false,

      detailLbtImg: "", //轮播
      detailLbtImga: "", //规格图片
      titlePriceSales: "", //标题，价格，销量
      evaluation: "", //评价
      Merchants: "", //商家用户名
      serving: "", //服务
      id: "", //详情页取到本身的id
      storeId: "", //店铺首页id
      detailShopId: "", //店铺首页id获取
      goods_id: "", //详情页描述取到本身的id
      webViewImg: "",
      goodsId: "", //商品id跳转到评价

      specNameList: [], //选择规格标题
      specProp: [] //规格内容
    };
  },
  mounted() {
    this.fetchData();
    this.detailWebView();
    this.clickHead();
    this.detailSku();
  },
  // computed:{
  //     List:function(){
  //           var arrByZM = [];//声明一个空数组来存放数据
  //           for (var i=0;i<this.specNameList.length;i++){
  //             arrByZM.push(this.specNameList[i]);
  //             console.log(this.specNameList[i]);
  //             //向空数组中添加数据
  //           }
  //           //一定要记得返回筛选后的数据
  //           return arrByZM;
  //     },
  //      Listt:function(){
  //           var arrByZMM = [];
  //           for (var j=0;j<this.specProp.length;j++){
  //               arrByZMM.push(this.specProp[j]);
  //               console.log(this.specProp[j]);
  //           }
  //           return arrByZMM;
  //     },
  // },   
  methods: {
    // 加减
    detailPlus() {
      var add = $(".add").siblings(".countNumber");
      add.val(parseInt(add.val()) + 1);
      this.goodsCount++;
    },
    detailSign() {
      var reduce = $(".reduce").siblings(".countNumber");
      reduce.val(parseInt(reduce.val()) - 1);
      if (parseInt(reduce.val()) < 1) {
        reduce.val(1);
        this.goodsCount--;
      }
    },
    //end
    goto_detailShop(storeId) {
      //跳转到详情页
      console.log(storeId);
      this.$router.push({
        path: "/detailShop",
        name: "detailShop",
        params: { storeId: storeId }
      });
    },
    goto_evaluation(goodsId) {
      //跳转到详情页
      console.log(goodsId);
      this.$router.push({
        path: "/detailEvaluation",
        name: "detailEvaluation",
        params: { goodsId: goodsId }
      });
    },

    // 详情主页
    fetchData() {
      axios
        .post(
          "/api_goods_detail.htm",
          qs.stringify({
            id: this.$route.params.id
          })
        )
        .then(res => {
          console.log(res);
          this.detailLbtImg = res.data.result.goods_photos; //轮播
          this.detailLbtImga = res.data.result.goods_photos[0]; //规格图片
          this.titlePriceSales = res.data.result; //标题，价格，销量
          this.evaluation = res.data.result.appEvaluateDate; //评价appEvaluateDate
          this.Merchants = res.data.result.goods_store.user; //商家用户名
          this.detailShopId = res.data.result.goods_store; //商家用户名
          this.serving = res.data.result.storeScoreEntity; //物流和卖家服务
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 详情页描述
    detailWebView() {
      axios
        .get(
          "/api_goods_detail_view.htm",
          qs.stringify({
            goods_id: this.$route.params.id
          })
        )
        .then(res => {
          console.log(res);
          console.log((this.webViewImg = res.config[0]));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 规格
    detailSku() {
      axios
        .post(
          "/getSpecGoodsItems.htm",
          qs.stringify({
            goodsId: this.$route.params.id
          })
        )
        .then(res => {
          console.log(res);
          this.specNameList = res.data.result.specifiList.spec_name_list; //规格标题
          this.specProp = res.data.result.specifiList.spec_prop; //规格内容
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 头部的opacity值变化.优化
    clickHead: function() {
      //头部的点击到对应模块
      $(".detailHead_text li").on("click", function() {
        var $offsettop = $(".detailMain .aaasss")
          .eq($(this).index())
          .offset().top;
        $("html,body").animate({
          scrollTop: $offsettop //赋值给滚动条top值
        });
      });
      var setCoverOpacity = function() {
        var $scrolltop = $(window).scrollTop();
        //  console.log( $scrolltop);
        if ($scrolltop > 0 && $scrolltop < 371) {
          $(".detailHead_text3").removeClass("active");
          $(".detailHead_text2").removeClass("active");
          $(".detailHead_text1").addClass("active");
        } else if ($scrolltop >= 371 && $scrolltop < 420) {
          $(".detailHead_text3").removeClass("active");
          $(".detailHead_text1").removeClass("active");
          $(".detailHead_text2").addClass("active");
        } else if ($scrolltop >= 420) {
          $(".detailHead_text1").removeClass("active");
          $(".detailHead_text2").removeClass("active");
          $(".detailHead_text3").addClass("active");
        }
        if ($scrolltop == 0) {
          $(".detailHead").css({
            opacity: 0,
            display: "none"
          });
        } else {
          $(".detailHead").css({
            display: "block",
            opacity: $scrolltop / 180 > 1 ? 1 : $scrolltop / 180
          });
        }
      };
      //初始化设置背景透明度
      setCoverOpacity();
      //监听滚动条事件，改变透明度
      $(window).scroll(function() {
        setCoverOpacity();
      });
    },
    // 选择规格
    selectType(nameIndex, typeIndex) {
      var newObj = {};
      newObj[nameIndex] = typeIndex;
      this.choosenType = Object.assign({}, this.choosenType, newObj);

      const typeArray = this.specProp.map((types, index) => {
        const type = types[this.choosenType[index]];
        return type ? `"${type}"` : type;
      });
      const gspArray = this.specNameList
        .map((name, index) => {
          const type = this.specProp[index][this.choosenType[index]];
          const gsp = `${name}<:>${type}`;
          return this.choosenType[index] !== undefined ? gsp : undefined;
        })
        .filter(val => !(!val || val === ""));
      this.gspString = gspArray.join("<,>");
      this.choosenTypeString = typeArray.join("");
    },
    // 判断是否有规格未选
    isSelectedFinish() {
      return this.specNameList.some((name, index) => {
        return this.choosenType[index] === undefined;
      });
    },
    // 添加到购物车
    addToCart() {
      const that = this;
      if (this.isSelectedFinish()) {
        Toast('请选择规格')
        return;
      }
      const url = this.isAddToCart
        ? "/api_add_cart.htm"
        : "/app_buyGoods_atNowTime.htm";
      const userId = this.isAddToCart
        ? {
            user_id: that.userId,
            id: that.$route.params.id
          }
        : { userId: that.userId, goodsId: that.$route.params.id };
      axios
        .post(
          url,
          qs.stringify({
            count: that.goodsCount,
            gsp: that.gspString, //Base64.encodeURI(that.gspString),
            tuijian_id: "",
            ...userId
          })
        )
        .then(res => {
          const { data } = res;
          const { msg, result, status } = data;
          // 请求成功的返回值？
          if (msg === "添加成功") {
            Toast('添加成功')
            that.selectionSpecificationHide();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //底部弹框
    selectionSpecificationShow(isAddToCart) {
      this.isAddToCart = isAddToCart;
      $(".detailMain3s_selection").animate({ top: "0" }, 200);
      $(".detailMain3s_selection1").animate({ bottom: "0" }, 200);
    },
    selectionSpecificationHide() {
      $(".detailMain3s_selection").animate({ top: "19.2rem" }, 200);
      $(".detailMain3s_selection1").animate({ bottom: "-13.5rem" }, 200);
    },
    //分享赚钱
    selectionSpecificationShow1() {
      $(".detailMain1s_selection").animate({ top: "0" }, 200);
      $(".detailMain1s_selection1").animate({ bottom: "0" }, 200);
    },
    selectionSpecificationHide1() {
      $(".detailMain1s_selection").animate({ top: "19.2rem" }, 200);
      $(".detailMain1s_selection1").animate({ bottom: "-8.99rem" }, 200);
    }
  }
};
</script>
<style lang="scss">
.detailHead_left {
  top: 1.11rem;
  left: 0.42rem;
}
.detailHead_right {
  top: 1.11rem;
  right: 0.42rem;
}
.detailHeadImg {
  z-index: 999;
  width: 0.9rem;
  height: 0.9rem;
  background: #666666;
  border-radius: 100%;
  position: fixed;
  opacity: 0.5;
  .detailHead_left_right_img {
    padding-top: 0.2rem;
    width: 0.25rem;
    height: 0.43rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.detailHead {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 3.9rem;
  background: #fff;
  opacity: 0;
  .detailHead_text {
    li {
      width: 3.6rem;
      height: 1.48rem;
      text-align: center;
      line-height: 1.48rem;
      float: left;
      top: 2.42rem;
      position: relative;
      font-size: 0.36rem;
    }
    .active {
      color: red;
    }
  }
}
.detailSwipe {
  .mint-swipe {
    height: 10.8rem;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicators {
      left: 13%;
    }
  }
}
.detailMain {
  .detailMain1 {
    height: 1.65rem;
    border-bottom: 0.02rem solid #f2f2f2;
    .detailMainP {
      width: 7.6rem;
      margin: 0.37rem 0.64rem 0 0.44rem;
      font-size: 0.42rem;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .detailMainF {
      height: 1.65rem;
      border-left: 0.02rem solid #f2f2f2;
      .detailMainImg {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.26rem 0 0.25rem 0.8rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 0.32rem;
        color: #a3a3a3;
        margin-left: 0.3rem;
      }
    }
    .wwww {
      float: left;
    }
  }
  .detailMain2 {
    height: 2.4rem;
    border-bottom: 0.12rem solid #f2f2f2;

    p {
      margin-top: 0.06rem;
      line-height: 1.3rem;
      font-size: 0.4rem;
      color: #fe0002;
      margin-left: 0.46rem;
    }
    .detailMain2S {
      margin-left: 0.46rem;
      font-size: 0.34rem;
      color: #a3a3a3;
      :nth-child(2) {
        position: absolute;
        right: 0.46rem;
      }
    }
  }
  .detailMain3 {
    position: relative;
    height: 1.35rem;
    border-bottom: 0.12rem solid #f2f2f2;
    span {
      position: absolute;
    }
    .detailMain3s {
      font-size: 0.36rem;
      left: 0.43rem;
      line-height: 1.35rem;
    }
    .detailMain3Img {
      display: inline-block;
      width: 0.26rem;
      height: 0.51rem;
      right: 0.42rem;
      top: 0.42rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .detailMain4 {
    height: 1.35rem;
    border-bottom: 0.03rem solid #f2f2f2;
    span {
      line-height: 1.35rem;
      position: absolute;
    }
    .detailMain3s_selectionSpan {
      color: #343434;
      font-size: 0.37rem;
      left: 0.44rem;
    }
    .detailMain3s_selectionSpan1 {
      color: #ee422c;
      font-size: 0.37rem;
      right: 0.72rem;
    }
    .detailMain3s_selectionSpan2 {
      width: 0.2rem;
      height: 0.33rem;
      display: inline-block;
      right: 0.42rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .detailMain5 {
    position: relative;
    height: 4.2rem;
    border-bottom: 0.12rem solid #f2f2f2;
    .detailMain5P {
      position: absolute;
      font-size: 0.34rem;
      top: 3.2rem;
      left: 0.65rem;
      color: #333333;
      width: 5.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .detailMain5Span {
      span {
        height: 0.74rem;
        display: inline-block;
        float: left;
        line-height: 0.74rem;
        background: #fecccb;
        color: #6a6464;
        font-size: 0.34rem;
        margin: 0.69rem 0.45rem 0.54rem 0.45rem;
      }
    }
    .detailMain5M {
      position: absolute;
      .detailMain5Mimg {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 100%;
        position: absolute;
        top: 1.97rem;
        left: 0.54rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      span {
        position: relative;
        font-size: 0.28rem;
        top: 2.16rem;
        left: 1.39rem;
      }
    }
  }
  .detailMain6 {
    .detailMain6He {
      position: relative;
      height: 2.32rem;
      .detailMain6HeImg {
        position: absolute;
        width: 1.44rem;
        height: 1.44rem;
        left: 0.45rem;
        top: 0.48rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .detailMain6HeP {
        position: absolute;
        left: 2.36rem;
        top: 0.56rem;
        :nth-child(1) {
          font-size: 0.41rem;
          margin-bottom: 0.36rem;
        }
        :nth-child(2) {
          font-size: 0.32rem;
          color: #309744;
        }
      }
      .detailMainBtn {
        position: absolute;
        color: #fff;
        background: red;
        border: none;
        right: 0.44rem;
        top: 1.36rem;
        border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
        width: 2rem;
        font-size: 0.4rem;
        height: 0.7rem;
      }
    }
    .detailMain6Ma {
      position: relative;
      height: 1.38rem;
      :nth-child(1) {
        left: 1.29rem;
      }
      :nth-child(2) {
        right: 1.29rem;
      }
      div {
        position: absolute;
        float: left;
        line-height: 1.38rem;
        :nth-child(1) {
          font-size: 0.34rem;
        }
        :nth-child(2) {
          font-size: 0.26rem;
          color: #df4938;
        }
      }
    }
  }
  .detailMain1s_selection1 {
    width: 100%;
    position: fixed;
    z-index: 999;
    background: #fff;
    bottom: -8.99rem;
    .detailMain1s_selection1Btn1 {
      height: 1.54rem;
      line-height: 1.54rem;
      text-align: center;
      font-size: 0.35rem;
      color: #666666;
    }
    .detailMain1s_selection1Btn {
      height: 1.78rem;
      line-height: 1.78rem;
      text-align: center;
      font-size: 0.51rem;
      color: #666666;
    }
    .sharePl {
      height: 3.26rem;
      li {
        margin-top: 0.54rem;
        width: 2.7rem;
        float: left;
        .sharePlus {
          width: 1.44rem;
          height: 1.44rem;
          background: #ebebeb;
          border-radius: 14%;
          margin: auto;
          margin-bottom: 0.33rem;
          div {
            width: 0.6rem;
            height: 0.6rem;
            padding-top: 0.42rem;
            padding-left: 0.42rem;
          }
        }
        .shareP {
          font-size: 0.34rem;
          color: #616161;
          text-align: center;
        }
      }
    }
    .sharePl2 {
      height: 2.12rem;
      margin-top: 0.3rem;
      li {
        position: absolute;
        .sharePlus2 {
          margin: auto;
        }
        .shareP2 {
          margin-top: 0.53rem;
          text-align: center;
          font-size: 0.31rem;
        }
      }
      :nth-child(1) {
        left: 0.82rem;
        .sharePlus2 {
          width: 0.52rem;
          height: 0.53rem;
        }
      }
      :nth-child(2) {
        left: 2.5rem;
        .sharePlus2 {
          width: 0.64rem;
          height: 0.53rem;
        }
      }
      :nth-child(3) {
        left: 4.5rem;
        .sharePlus2 {
          width: 0.6rem;
          height: 0.6rem;
        }
        .shareP2 {
          margin-top: 0.46rem;
        }
      }
      :nth-child(4) {
        right: 2.8rem;
        .sharePlus2 {
          width: 0.63rem;
          height: 0.53rem;
        }
      }
      :nth-child(5) {
        right: 0.29rem;
        .sharePlus2 {
          width: 0.62rem;
          height: 0.62rem;
        }
        .shareP2 {
          margin-top: 0.44rem;
        }
      }
    }
  }
  .detailMain3s_selection,
  .detailMain1s_selection {
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 19.2rem;
    bottom: 0;
    background: #3f3838;
    opacity: 0.5;
    top: 19.2rem;
  }
  .detailMain3s_selection1 {
    width: 100%;
    position: fixed;
    z-index: 999;
    background: #fff;
    padding-left: 0.48rem;
    padding-bottom: 0.48rem;
    bottom: -13.5rem;
    height: 12.42rem;
    .detailMain3sSkuHead {
      .detailMain3s_selection1Img {
        width: 3rem;
        height: 3rem;
        top: -0.6rem;
        position: absolute;
        border: 0.03rem solid #a3a3a3;
      }
      .detailMain3sSkuHeadCenter {
        margin-left: 3.2rem;
        :nth-child(1) {
          font-size: 0.45rem;
          color: #f97314;
          margin-top: 0.2rem;
          padding-bottom: 0.25rem;
        }
        p {
          padding-bottom: 0.15rem;
        }
      }
      .detailMain3s_selection1X {
        width: 0.66rem;
        height: 0.66rem;
        position: absolute;
        right: 1rem;
        top: 0.45rem;
      }
    }
    .detailMain3sSkuMain {
      margin-top: 1rem;
      height: 7rem;
      overflow: hidden;
      .aaax {
        height: 7rem;
        overflow: auto;
        .type-name {
          margin-top: 0.3rem;
        }
        .type-list {
          display: flex;
          margin-top: 0.2rem;
          .type-item {
            padding: 0.2rem 0.3rem;
            margin-right: 0.3rem;
            background-color: #eee;
            color: #000;
            border-radius: 0.6rem;
            &.active {
              background-color: #f97314;
              color: #fff;
            }
          }
        }
        .detailMain3sSkuFoot {
          height: 1rem;
          margin-top: 0.5rem;
          .aH {
            float: left;
          }
          .detailMain3s_selection1H {
            font-size: 0.45rem;
            font-weight: normal;
            line-height: 1rem;
            margin-right: 1.1rem;
            margin-left: 1rem;
          }
          .count {
            .count-btn {
              display: inline-block;
              height: 0.9rem;
              width: 1.68rem;
              line-height: 0.9rem;
              text-align: center;
              background: #f97314;
              color: #fff;
              font-weight: bold;
              border-radius: 8%;
            }
            .countNumber {
              color: #757575;
              background: none;
              border: 0.02rem solid #757575;
              margin: 0 0.28rem;
              font-weight: normal;
            }
          }
        }
      }
    }
    .detailMain3s_selection1Btn {
      width: 9.84rem;
      height: 1.44rem;
      background: #f97314;
      color: #fff;
      font-size: 0.43rem;
      font-weight: bold;
      outline: none;
      border: none;
      border-radius: 2%;
      position: absolute;
      bottom: 0.48rem;
    }
  }
}
.detailFoot {
  position: fixed;
  height: 1.67rem;
  width: 100%;
  bottom: 0;
  background: #fff;
  .detailFootImgP {
    position: absolute;
    border-top: 0.01rem solid #999999;
    height: 1.67rem;
    width: 3.26rem;
    div {
      width: 0.54rem;
      height: 0.52rem;
      position: relative;
      top: 0.27rem;
      left: 0.54rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      position: absolute;
      top: 1rem;
      left: 0.44rem;
      font-size: 0.36rem;
      color: #000;
    }
  }
  .detailFootS {
    span {
      position: absolute;
      line-height: 1.66rem;
      text-align: center;
      font-size: 0.53rem;
      color: #fff;
    }
    :nth-child(1) {
      display: inline-block;
      width: 4.07rem;
      background: #f97314;
      right: 3.47rem;
    }
    :nth-child(2) {
      display: inline-block;
      width: 3.47rem;
      background: #f13f3f;
      right: 0;
    }
  }
}
.chosse {
  background: #f97314;
  color: #fff;
}
</style>