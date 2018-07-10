<template>
  <div>
    <div class="Cart">
      <!-- 头部 -->
      <div class="cartHead">
         <div class="cartHead1">购物车</div>
         <div class="cartHead2" v-text="btnText" @click="showToggle">编辑</div>
      </div>

      <!-- 无商品页面 -->
      <!-- <div class="cartP">
        <div class="cartImg">
          <img src="../../assets/mIcon/img_null_goods.png" alt="" srcset="">
        </div>
        <p>你还没有相关商品</p>
        <span>可以逛逛有哪些想买的</span>
      </div> -->
      <!-- 主体列表 -->
<div class="cartList">
  <ul class="cartListdiv">
    <li class="cartListLi" v-for="(data,index) in cartList" :key="index">
    <div class="cartListdiv1">
      <div class="cartListdiv1_1">
        <span type="checkbox" class="checkbox2" :class="{check: data.store.checked}"></span>
      </div>
      <div class="cartListdiv1_2">
          <img src="../../assets/mIcon/cart_shop.png" alt="" srcset="">
      </div>
      <div class="cartListdiv1_3"><p>{{data.store.store_name}}</p></div>
      <div class="cartListdiv1_4">
          <img src="../../assets/mIcon/title_back_normal.png" alt="" srcset="">
      </div>
      <div class="cartListdiv1_5">编辑</div>
    </div>

    <ul class="cartListdiv2">
      <li class="cartListdiv2_Li" v-for="(dataa, indexx) in cartList[index].gcs" :key="indexx">
        <div class="cartListdivDetel">
          <p class="cartListdivDetelP" v-show="!isShow" @click="deleteGood(dataa.id)">删除</p>
        </div>
        <div class="cartListdiv2_1">
          <span type="checkbox" class="checkbox checkbox1" :class="{check: dataa.checked}" @click="selectedProduct(dataa)"></span>
        </div>
        <div class="cartListdiv2_2">
          <img v-if="dataa.goods.goods_main_photo" :src="'http://www.d1sc.com/'+changeData(dataa.goods.goods_main_photo.path,dataa.goods.goods_main_photo.name)" alt="" @click="goto_detail(dataa.goods.id)">
        </div>
        <div class="cartListdiv2_3" v-show="isShow">
          <p class="cartListPtitle" @click="goto_detail(dataa.goods.id)">{{dataa.goods.goods_name}}</p><!-- //商品标题。 -->
          <p class="cartListPrice">￥{{dataa.goods.goods_price | formatMoney()}}</p><!-- 商品价格。 -->
          <p class="cartListPrice1">￥{{dataa.price | formatMoney()}}</p><!-- 商品打折价 -->
          <p class="cartListPp">{{dataa.spec_info_key.replace("<:>",":").replace("<,>","").replace("<:>",":").replace("<,>","").replace("<:>",":").replace("<,>","")}}</p><!-- 商品规格 -->
          <div class="cartAmount">
            <p class="cartReduce" @click="changeMoney(dataa, -1)">-</p>
            <p><input class="cartAmountSpan" type="text"  value="0" v-model="dataa.count" readOnly="true"></p>
            <p class="cartAddition" @click="changeMoney(dataa, 1)">+</p>
          </div>
        </div>
      </li>
    </ul>
    </li>
  </ul>
</div>
<!-- 底部支付 -->
    <div class="CartFoot">
        <div class="CartFootdiv1">
          <span class="checkbox" :class="{'check': checkedAllFlag}" @click="checkedAll(true)"></span>
        </div>
        <div class="CartFootdiv2">全选</div>
        <div class="CartFootdiv3" v-show=isShow>小计：<span class="CartFootSpan3_1">{{totalMoney | totalMoney()}}</span></div>
        <div class="CartFootdiv4" v-show=isShow><button type="submit" @click="submitOrder()">支付</button></div>
        <div class="CartFootDelet" v-show=!isShow><button type="submit">删除</button></div>
      </div>
    </div>
      <!-- 底部导航 -->
    <div class="tabfoot" >
      <ul class="tabfoot1">
        <router-link to="/">
          <li class="footImg1">
            <img src="../../assets/mIcon/ic_homepage_gray.png">
            <img src="../../assets/mIcon/ic_homepage_green.png" class="footImg2">
            <p>万手</p>
          </li>
        </router-link>
        <li class="footImg1">
          <img src="../../assets/mIcon/ic_discover_gray.png">
          <img src="../../assets/mIcon/ic_discover_red.png">
          <p  class="footP">购物车</p>
        </li>
        <router-link to="./my">
          <li class="footImg1">
            <img src="../../assets/mIcon/ic_person_gray.png">
            <img src="../../assets/mIcon/ic_person_red.png" class="footImg2">
            <p>我的</p>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      btnText: "编辑", //编辑完成删除showhide
      isShow: true, //编辑完成删除showhide
      cartList: [],
      cartListt: [],
      totalMoney: 0,
      checkedAllFlag: false, //全选
      id: "", //详情页id
      userid:"",
      //编辑购物车数量
      paramsList: "",
    };
  },
  //挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
  },
  mounted() {
    this.$nextTick(() => {
      this.getCartList();
      this.calcTotalPrice();
    });
  },
  filters: {
    totalMoney(value, type) {
      return `￥${value.toFixed(1)}`;
    }
  },
  methods: {
    selectedProduct(dataa) {
      if (typeof dataa.checked === "undefined") {
        this.$set(dataa, "checked", true);
      } else {
        dataa.checked = !dataa.checked;
      }
      this.calcTotalPrice();
    },
    //全选
    checkedAll(flag) {
      if (flag) {
        this.checkedAllFlag = !this.checkedAllFlag;
      } else {
        this.checkedAllFlag = false;
      }
      this.cartList.forEach((data, index) => {
        if (typeof data.store.checked === "undefined") {
          this.$set(data.store, "checked", this.checkedAllFlag);
        } else {
          data.store.checked = this.checkedAllFlag;
        }
        this.cartList[index].gcs.forEach((dataa, indexx) => {
          if (typeof dataa.checked === "undefined") {
            this.$set(dataa, "checked", this.checkedAllFlag);
          } else {
            dataa.checked = this.checkedAllFlag;
          }
        });
      });
      this.calcTotalPrice();
    },
    showToggle: function() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.btnText = "编辑";
      } else {
        this.btnText = "完成";
      }
    },
    goto_detail(id) {
      //跳转到详情页
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: { id: id }
      });
    },
    //获取购物车列表
    getCartList() {
      var self = this;
      axios
        .post(
          "/cart_list.htm",
          qs.stringify({
            user_id: this.userid,
            currentPage: 0
          })
        )
        .then(res => {
          self.cartListt = [];
          this.cartList = res.data.result;
          for (var i = 0; i < this.cartList.length; i++) {
            for (var j = 0; j < this.cartList[i].gcs.length; j++) {
              var cartListtt = this.cartList[i].gcs[j];
              self.cartListt.push(cartListtt);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitOrder() {
            var info =[];
      this.cartList.forEach((data, index) => {
        var storeCar ={"storeCartId":data.id,"goodsCartIds":[]}
        data.gcs.forEach((dataa, indexx) => {
          if (dataa.checked) {
            storeCar.goodsCartIds.push(dataa.id)
          }
        })
        if(storeCar.goodsCartIds.length!=0){
          storeCar.goodsCartIds=storeCar.goodsCartIds.join(',');
          info.push(storeCar);
        };
      });
      
      var payInfos = JSON.stringify(info);
      axios
        .post(
          "/apiOrderShow.htm",
          qs.stringify({
             userId: this.userid,
            arrayIds:payInfos
          }))
        .then(res => {
        const {result}=res.data;
        const {storeCartList}=result;
        let order_id=[];
        let order_idd=[];
        storeCartList.forEach(function(item,index){
        order_id.push(item.id);
           // item.gcs.forEach((itemGcs, indexx) => {
           //  order_idd.push(itemGcs.id);
           //    for( var ii=0; ii<order_idd.length; ii++){
           //      console.log(order_idd[ii]);
           //    }
           //  })
         order_idd.push(item.gcs[0].id);
        })
       
          var orderId = JSON.stringify(order_id).slice(1,6);
          var orderIdd = JSON.stringify(order_idd).slice(1,7);
          // var orderIdd =order_idd.join(',');
          console.log(orderId);
          console.log(orderIdd);
          if(info.length==0){
            Toast('购物车为空');
          }else{
            this.$router.push({
            path:'/confirm',
            name:'confirm',
            params:{orderId,orderIdd}
            });
          }
         })
        .catch(function(error) {
        console.log(error);
      });
    },
    // 删除商品
    deleteGood(goodsCartIds) {
      axios
        .post(
          "/api_remove_cart.htm",
          qs.stringify({
            goodsCartIds,
            userId: this.userid,
          })
        )
        .then(res => {
          const { data } = res;
          const { msg, result, status } = data;
          if (msg === "删除成功") {
            // 删除成功
            Toast("删除成功");
            this.getCartList();
            this.isShow = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //修改购物车
    editCartList(goodInfo) {
      const data = [
        {
          count: goodInfo.count,
          gsp: goodInfo.spec_info_key,
          goodsCartId: goodInfo.id
        }
      ];
      axios
        .post(
          "/api_edit_cart.htm",
          qs.stringify({
            paramsList: JSON.stringify(data)
          })
        )
        .then(res => {
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //加减
    changeMoney(goodInfo, way) {
      if (way > 0) {
        goodInfo.count++;
      } else {
        goodInfo.count--;
        if (goodInfo.count < 1) goodInfo.count = 1;
      }
      this.editCartList(goodInfo);
      this.calcTotalPrice();
    },
    //总价
    calcTotalPrice() {
      this.totalMoney = 0;
      this.cartList.forEach((data, index) => {
        data.gcs.forEach((dataa, indexx) => {
          if (dataa.checked) {
            this.totalMoney += dataa.price * dataa.count;
          }
        });
      });
    }
    //商品选中
  }
};
</script>

<style lang="scss">
/* @import "../../../static/style/css/cart.css"; */
.Cart {
  // 头部编辑
  .cartHead {
    position: fixed;
    height: 1.5rem;
    width: 100%;
    background: #f78836;
    z-index: 999;
    .cartHead1 {
      line-height: 1.5rem;
      text-align: center;
      font-size: 0.52rem;
      color: #fff;
    }
    .cartHead2 {
      position: absolute;
      font-size: 0.4rem;
      color: #fff;
      right: 0.89rem;
      top: 0;
      line-height: 1.5rem;
    }
  }
  //主体列表部分
  .cartList {
    padding-top: 1.5rem;
    overflow: auto;
    padding-bottom: 3.4rem;
    .cartListdiv {
      .cartListLi {
        border-top: 0.2rem solid #f2f2f2;
        .cartListdiv1 {
          position: relative;
          height: 1.5rem;
          background: #fff;
          div {
            float: left;
            line-height: 1.5rem;
          }
          .cartListdiv1_1 {
            margin-left: 0.3rem;
            margin-right: 0.57rem;
            .checkbox2 {
              display: block;
              margin: 0.42rem 0 0 0;
              width: 0.66rem;
              height: 0.66rem;
              border: 0.03rem solid;
              border-radius: 50%;
            }
            .check {
              background: url(../../assets/mIcon/cart_checkbox.png);
              background-size: 100% 100%;
            }
          }
          .cartListdiv1_2 {
            height: 0.5rem;
            width: 0.54rem;
            margin-top: 0.15rem;
            margin-right: 0.31rem;
          }
          .cartListdiv1_3 {
            font-size: 0.34rem;
            margin-right: 0.31rem;
          }
          .cartListdiv1_4 {
            height: 0.38rem;
            width: 0.18rem;
            margin-top: 0.1rem;
          }
          .cartListdiv1_5 {
            position: absolute;
            right: 0.61rem;
            font-size: 0.34rem;
          }
        }
        .cartListdiv2 {
          .cartListdiv2_Li {
            border-top: 0.02rem solid #f2f2f2;
            height: 4.5rem;
            .cartListdivDetel {
              .cartListdivDetelP {
                height: 4rem;
                background: red;
                position: absolute;
                right: 0;
                line-height: 4rem;
                width: 1.5rem;
                text-align: center;
                color: #fff;
                font-size: 0.34rem;
              }
            }
            div {
              float: left;
            }
            .cartListdiv2_1 {
              .checkbox1 {
                display: block;
                margin: 1.77rem 0.3rem 0 0.39rem;
                width: 0.66rem;
                height: 0.66rem;
                border: 0.03rem solid;
                border-radius: 50%;
              }
              .check {
                background: url(../../assets/mIcon/cart_checkbox.png);
                background-size: 100% 100%;
              }
            }
            .cartListdiv2_2 {
              width: 2.55rem;
              height: 2.76rem;
              margin-top: 0.66rem;
            }
            .cartListdiv2_3 {
              width: 6.12rem;
              margin: 0.71rem 0.48rem 0 0.24rem;
              position: relative;
              .cartListPtitle {
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-bottom: 0.5rem;
                font-size: 0.34rem;
              }
              .cartListPrice {
                margin-bottom: 0.15rem;
                font-size: 0.25rem;
                text-decoration: line-through;
                color: #999999;
              }
              .cartListPrice1 {
                margin-bottom: 0.3rem;
                font-size: 0.32rem;
                color: #e27010;
              }
              .cartAmount {
                position: absolute;
                right: 0;
                bottom: 0.7rem;
                p {
                  float: left;
                }
                .cartReduce {
                  height: 0.58rem;
                  width: 0.64rem;
                  border: 0.01rem solid #ededed;
                  text-align: center;
                  line-height: 0.58rem;
                  color: #999999;
                  font-size: 0.6rem;
                  // border-radius: .1rem 0 0 .1rem;
                }
                .cartAmountSpan {
                  height: 0.54rem;
                  width: 1.02rem;
                  border: 0.03rem solid #f2f2f2;
                  text-align: center;
                  line-height: 0.54rem;
                  outline: none;
                  font-size: 0.4rem;
                }
                .cartAddition {
                  color: #999999;
                  height: 0.58rem;
                  width: 0.64rem;
                  border: 0.01rem solid #ededed;
                  text-align: center;
                  line-height: 0.58rem;
                  font-size: 0.6rem;
                  // border-radius: 0 .1rem .1rem 0;
                }
              }
            }
          }
        }
      }
    }
  }
  // 底部支付
  .CartFoot {
    height: 1.5rem;
    border-top: 0.05rem solid #f2f2f2;
    position: fixed;
    bottom: 1.68rem;
    width: 100%;
    background: #fff;
    div {
      float: left;
      line-height: 1.5rem;
    }
    .CartFootdiv1 {
      .checkbox {
        display: block;
        margin: 0.42rem 0.2rem 0 0.45rem;
        width: 0.66rem;
        height: 0.66rem;
        border: 0.03rem solid;
        border-radius: 50%;
      }
      .check {
        background: url(../../assets/mIcon/cart_checkbox.png);
        background-size: 100% 100%;
      }
    }
    .CartFootdiv2 {
      font-size: 0.53rem;
      margin-top: 0.05rem;
    }
    .CartFootdiv3 {
      position: absolute;
      right: 3.32rem;
      font-size: 0.36rem;
      .CartFootSpan3_1 {
        color: #e46f0f;
        font-size: 0.36rem;
      }
    }
    .CartFootdiv4 {
      position: absolute;
      right: 0;
      button {
        border: 0;
        outline: none;
        height: 1.5rem;
        width: 3rem;
        color: #fff;
        background: #f97314;
        font-size: 0.6rem;
      }
    }
    .CartFootDelet {
      position: absolute;
      right: 0;
      button {
        border: 0;
        outline: none;
        height: 1.5rem;
        width: 3rem;
        color: #fff;
        background: red;
        font-size: 0.6rem;
      }
    }
  }

  .cartP {
    position: absolute;
    .cartImg {
      margin-left: 3.5rem;
      margin-top: 3rem;
      width: 3.92rem;
      height: 3.17rem;

    }
    img {
      width: 100%;
      height: 100%;
    }
    p {
      font-size: 0.5rem;
      color: #333333;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.33rem;
      margin-top: 0.59rem;
      margin-left: 3.1rem;
    }
    span {
      font-size: 0.33rem;
      color: #666666;
      display: block;
      text-align: center;
      margin-left: 3.1rem;
    }
  }
}

//底部导航
.tabfoot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.65rem;
  border-top: 0.03rem solid #e0e0e0;
  background: #ffffff;
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
</style>
