<template>
  <div class="orderC">
  	<div class="HeadorderC">
    	<div class="HeadorderCImg">
    		<img src="../../assets/mIcon/title_back_white.png" alt="">
    	</div>
    	<div class="HeadorderCP">确认订单</div>
    </div>

    <div class="mainorderC">
    	<div class="heaDmainorderC">
    		<div class="heaDmainorderC1">
    			<div class="orderC1User">
    				<span class="orderC1UserImg"><img src="../../assets/mIcon/icon_yonghu.png" alt=""></span>
    				<span class="orderC1UserSpan">{{addrss.trueName}}</span>
    			</div>
    			<div class="orderC1Phone">
    				<span class="orderC1PhoneImg"><img src="../../assets/mIcon/icon_shouji_small.png" alt=""></span>
    				<span class="orderC1PhoneSpan">{{addrss.mobile}}</span>
    			</div>
    		</div>
    		<div class="heaDmainorderC2">
    			<span class="orderPartC2Img"><img src="../../assets/mIcon/share.png" alt=""></span>
    			<span class="orderPartC2P">
          {{addrss.area.parent.parent.areaName+addrss.area.parent.areaName+addrss.area.areaName+addrss.area_info}}</span>
    			<span class="orderPartC2Img1"><img src="../../assets/mIcon/title_back_normal.png" alt=""></span>
    		</div>
    	</div>


    	<ul class="orderCList">
    		<!-- 每个店铺的列表 -->
    		<li class="orderCListLi" v-for="(item, index) in storeCartListt" :key="index">
    			<div class="orderCListHead">
    				<div class="orderCListHeadImg">
    					<img src="../../assets/mIcon/cart_shop.png" alt="">
    				</div>
    				<span class="orderCListHeadSpan">{{item.store.store_name}}</span>
    				<span class="orderCListHeadImg1">
    					<img src="../../assets/mIcon/title_back_normal.png" alt="">
    				</span>
    			</div>
    			<!-- 循环店铺的所有商品 -->
          <!-- <div v-for="(list, index) in item" :key="index">
              <span>{{list.name}}</span>
              <div v-for="(cell, key) in list.arr" :key="key">{{cell}}</div>
          </div> -->


    				<div class="orderCListMain1" v-for="(itemm ,indexx) in item.gcs" :key="indexx">
    					<div class="orderCListMain1_1 ListLeft"><img :src="'http://www.d1sc.com/'+changeData(itemm.goods.goods_main_photo.path,itemm.goods.goods_main_photo.name)" alt=""></div>
    					<div class="orderCListMain1_2 ListLeft">
    						<p class="orderCListMain1_21">{{itemm.goods.goods_name}}</p>
    						<p class="orderCListMain1_22" v-if="itemm.spec_info_key">{{itemm.spec_info_key.replace("<:>",":").replace("<,>","").replace("<:>",":").replace("<,>","").replace("<:>",":").replace("<,>","")}}</p>
    						<p class="orderCListMain1_23">x{{itemm.count}}</p>
    					</div>
    					<div class="orderCListMain1_3 ListLeft">
							<p class="orderCListMain1_31">{{itemm.goods.store_price | formatMoney()}}</p>
							<p class="orderCListMain1_32">{{itemm.goods.goods_price | formatMoney()}}</p>
    					</div>
    				</div>

					<div class="orderCListMain2">
						<div class="orderCListMain2_1 ListLeft2">配送方式</div>
						<div class="orderCListMain2_2 ListLeft2">包邮</div>
						<div class="orderCListMain2_3 ListLeft2"><img src="../../assets/mIcon/title_back_normal.png" alt=""></div>
					</div>

					<div class="orderCListMain3">
						<div class="orderCListMain3_1 ListLeft3">订单备注：</div>
						<div class="orderCListMain3_2 ListLeft3"><input type="text" class="orderCListMain3_2Ipt"></div>
					</div>
    		</li>
    	</ul>
    </div>
    <div class="footOrderc">
    	<span class="footOrderSpan">合计：￥{{AlltotalPrice}}</span>
    	<span class="footOrderSpan1"><button @click="submitOrder()">提交订单</button></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
     addrss:[],//地址
     userid:"",//用户名
     storeCartListt:[],//每个店铺的列表
     AlltotalPrice:'',//总价
    };
  },
   //挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
  },
  mounted() {
    this.$nextTick(() => {
      this.submitOrderr();
    });
  },
  methods: {
    submitOrder() {
      //积分支付
      axios
        .post(
          "/app_balance_payment.htm",
          qs.stringify({
            userId:this.userid,
            orderIds: this.$route.params.orderId
          })
        )
        .then(res => {
          const {status,msg,result}=res.data; 
          if(status==0){
            console.log(result);
          }else{
            alert(msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //确认订单列表
    submitOrderr() {
      const info =
        [{"storeCartId":84654,"goodsCartIds":"289749,289748,289746,289745"},{"storeCartId": 84547, "goodsCartIds": "289635"},{"storeCartId": 84301, "goodsCartIds": "289372"},{"storeCartId": 84231, "goodsCartIds": "289301"}];
      const payInfos = JSON.stringify(info);
      console.log(payInfos);
      axios
        .post(
          "/apiOrderShow.htm",
          qs.stringify({
            userId:this.userid,
            arrayIds:payInfos
          }))
        .then(res => {
          console.log(res);
          this.addrss = res.data.result.addrs[0];
          this.storeCartListt = res.data.result.storeCartList;
          var totalPrice = 0;//临时总价
          this.storeCartListt.forEach(function (val,index) {
              totalPrice +=val.total_price;//累计总价
          });
           this.AlltotalPrice =parseFloat(totalPrice);
        })
        .catch(function(error) {
          console.log(error);
      });
    },
  }
};
</script>

<style lang="scss">
.orderC {
  .HeadorderC {
    position: fixed;
    height: 1.5rem;
    width: 100%;
    background: #f58b3d;
    z-index: 100;
    .HeadorderCImg {
      width: 0.36rem;
      height: 0.62rem;
      position: absolute;
      top: 0.44rem;
      left: 0.36rem;
      z-index: 999;
    }
    .HeadorderCP {
      height: 1.5rem;
      width: 100%;
      line-height: 1.5rem;
      text-align: center;
      font-size: 0.49rem;
      color: #fff;
    }
  }

  .mainorderC {
    overflow: auto;
    height: 17.45rem;
    .heaDmainorderC {
      height: 3rem;
      width: 100%;
      border-bottom: 0.3rem solid #f8f8f8;
      position: relative;
      top: 1.5rem;
      .heaDmainorderC1 {
        position: relative;
        height: 1.45rem;
        width: 100%;
        border-bottom: 0.04rem solid #fbfbfb;
        background: #fff;
        z-index: -1;
        .orderC1User {
          position: absolute;
          left: 0.45rem;
          top: 0.45rem;
          .orderC1UserImg {
            display: inline-block;
            width: 0.51rem;
            height: 0.57rem;
          }
          .orderC1UserSpan {
            font-size: 0.45rem;
            position: relative;
            bottom: 0.08rem;
          }
        }
        .orderC1Phone {
          position: absolute;
          left: 5.4rem;
          top: 0.41rem;
          .orderC1PhoneImg {
            display: inline-block;
            width: 0.45rem;
            height: 0.66rem;
          }
          .orderC1PhoneSpan {
            font-size: 0.45rem;
            position: relative;
            bottom: 0.16rem;
          }
        }
      }
      .heaDmainorderC2 {
        background: #fff;
        height: 1.5rem;
        width: 100%;
        position: relative;
        z-index: -1;
        .orderPartC2Img {
          margin-left: 0.45rem;
          margin-top: 0.45rem;
          position: absolute;
          width: 0.48rem;
          height: 0.57rem;
          display: inline-block;
        }
        .orderPartC2P {
          line-height: 1.5rem;
          margin-left: 1.4rem;
          font-size: 0.4rem;
        }
        .orderPartC2Img1 {
          width: 0.27rem;
          height: 0.57rem;
          display: inline-block;
          position: absolute;
          right: 0.29rem;
          top: 0.48rem;
        }
      }
    }

    .orderCList {
      position: relative;
      top: 1.5rem;
      padding-bottom: 1.8rem;
      .orderCListLi {
        .orderCListHead {
          height: 1.5rem;
          width: 100%;
          position: relative;
          background: #fff;
          z-index: -1;
          .orderCListHeadImg {
            width: 0.54rem;
            height: 0.5rem;
            position: relative;
            top: 0.5rem;
            left: 0.45rem;
          }
          .orderCListHeadSpan {
            font-size: 0.4rem;
            margin-left: 1.6rem;
          }
          .orderCListHeadImg1 {
            width: 0.19rem;
            height: 0.39rem;
            display: inline-block;
            position: relative;
            left: 0.34rem;
            top: 0.05rem;
          }
        }
        .orderCListMain1 {
          height: 3.02rem;
          width: 100%;
          background: #f5f5f5;
          border-bottom: 0.03rem solid #dfdfdf;
          .ListLeft {
            float: left;
          }
          .orderCListMain1_1 {
            width: 2.7rem;
            height: 2.7rem;
            margin: 0.16rem 0.45rem 0 0.2rem;
          }
          .orderCListMain1_2 {
            width: 6rem;
            .orderCListMain1_21 {
              font-size: 0.4rem;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              margin-top: 0.47rem;
              margin-bottom: 0.24rem;
            }
            .orderCListMain1_22 {
              font-size: 0.3rem;
              color: #9e9e9e;
              margin-bottom: 0.16rem;
            }
            .orderCListMain1_23 {
              font-size: 0.3rem;
              color: #9e9e9e;
            }
          }
          .orderCListMain1_3 {
            margin-top: 1rem;
            .orderCListMain1_31 {
              font-size: 0.4rem;
            }
            .orderCListMain1_32 {
              font-size: 0.4rem;
              text-decoration: line-through;
            }
          }
        }
        .orderCListMain2 {
          height: 1.3rem;
          width: 100%;
          line-height: 1.3rem;
          position: relative;
          .ListLeft2 {
            float: left;
          }
          .orderCListMain2_1 {
            font-size: 0.4rem;
            margin-left: 0.45rem;
          }
          .orderCListMain2_2 {
            font-size: 0.34rem;
            position: absolute;
            right: 1.18rem;
            color: #676767;
          }
          .orderCListMain2_3 {
            width: 0.27rem;
            height: 0.52rem;
            position: absolute;
            right: 0.44rem;
            top: 0.13rem;
          }
        }
        .orderCListMain3 {
          height: 1.3rem;
          width: 100%;
          line-height: 1.3rem;
          border-top: 0.06rem solid #fcfcfc;
          border-bottom: 0.06rem solid #dfdfdf;
          .ListLeft3 {
            float: left;
          }
          .orderCListMain3_1 {
            font-size: 0.4rem;
            margin-left: 0.45rem;
          }
          .orderCListMain3_2 {
            .orderCListMain3_2Ipt {
              border: 0;
              outline: none;
            }
          }
        }
      }
    }
  }

  .footOrderc {
    position: fixed;
    bottom: 0;
    height: 1.77rem;
    border-top: 0.03rem solid #f7f7f7;
    width: 100%;
    background: #fff;
    .footOrderSpan {
      font-size: 0.49rem;
      color: #ef7b30;
      line-height: 1.77rem;
      margin-left: 0.46rem;
    }
    .footOrderSpan1 {
      position: absolute;
      right: 0;
      line-height: 1.77rem;
      button {
        height: 1.8rem;
        width: 3rem;
        border: 0;
        background: #f24040;
        outline: none;
        font-size: 0.5rem;
        color: #fff;
      }
    }
  }
}
</style>
