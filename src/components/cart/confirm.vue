<template>
  <div class="orderC">
  	<div class="HeadorderC">
    	<router-link to="./Cart"><div class="HeadorderCImg">
    		<img src="../../assets/mIcon/title_back_white.png" alt="">
    	</div></router-link>
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
    				<div class="orderCListMain1" v-for="(itemm ,indexx) in item.gcs" :key="indexx">
    					<div class="orderCListMain1_1 ListLeft"><img v-if="itemm.goods.goods_main_photo" :src="'http://www.d1sc.com/'+changeData(itemm.goods.goods_main_photo.path,itemm.goods.goods_main_photo.name)" alt=""></div>
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

					<div class="orderCListMain2" @click="selectionConfirmShow(true)">
						<div class="orderCListMain2_1 ListLeft2">配送方式</div>
						<div class="orderCListMain2_2 ListLeft2">快捷快递</div>
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
    	<span class="footOrderSpan">合计：￥{{AlltotalPrice |formatMoney()}}</span>
    	<span class="footOrderSpan1" @click="selectionPayingShow(true)">
        <button @click="sublimet()">提交订单</button>
      </span>
    </div>



    <!-- 快递 -->
    <div class="transId">
        <div class="header_transId" @click="selectionConfirmHide()">
            <div class="transId_heaImg">
                <img src="../../assets/mIcon/title_back_white.png" alt="">
            </div>
            <div class="header_H">配送方式</div>
        </div>

        <ul class="transId_main">
          <li v-for="(trans,index) in transIdddd" :key="index"  @click="selectionConfirmShow(true)">
            <span class="transId_main_span">aaaaaaaaa</span>
            <span class="transId_main_span1">{{trans.trans_name}}</span>
            <span class="transId_main_span2">￥10.0</span>
          </li>
        </ul>
    </div>



    <!-- 付款 -->
    <div class="paying">
      <div class="paying_Img">
        <div class="paying_img" @click="selectionPayingHide()">
          <img src="../../assets/mIcon/xx.png" alt="">
        </div>
      </div>
      

      <ul class="paying_ul">
        <li>
          <span class="paying_liImg">
            <img src="../../assets/mIcon/weixin1.png" alt="">
          </span>
          <span class="paying_liSpan">积分支付</span>
          <span class="paying_liIMG1">
            <div class="paying_li_border"></div>
            <div class="paying_li_img">
              <img src="../../assets/mIcon/icon_checked.png" alt="">
            </div>
          </span>
        </li>
        <li>
          <span class="paying_liImg">
            <img src="../../assets/mIcon/weixin1.png" alt="">
          </span>
          <span class="paying_liSpan">微信支付</span>
          <span class="paying_liIMG1">
            <div class="paying_li_border"></div>
            <div class="paying_li_img">
              <img src="../../assets/mIcon/icon_checked.png" alt="">
            </div>
          </span>
        </li>
        <li>
          <span class="paying_liImg">
            <img src="../../assets/mIcon/weixin1.png" alt="">
          </span>
          <span class="paying_liSpan">支付宝支付</span>
          <span class="paying_liIMG1">
            <div class="paying_li_border"></div>
            <div class="paying_li_img">
              <img src="../../assets/mIcon/icon_checked.png" alt="">
            </div>
          </span>
        </li>

        <button class="paying_sub" @click="payingJifen()">确认支付 合计：￥{{AlltotalPrice |formatMoney()}}</button>
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
     addrss:[],//地址
     userid:"",//用户名
     storeCartListt:[],//每个店铺的列表
     AlltotalPrice:'',//总价
      

     transIdddd:"",//快递列表

     orderIdss:'',//生成订单编号

      msg:'aaaaa',
      addsId:"",
      transId:[],//快递默认第一个id
      storeId:"",//店铺id

      isAddToConfirm:false,
      isAddToPaying:false,
    };
  },
   //挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
    this.payInfos=localStorage.payInfos;

  },
  mounted() {
    this.$nextTick(() => {
      this.submitOrderr();
    });
  },
  methods: {
    submitOrder() {
      
    },
    //确认订单列表
    submitOrderr() {
      const info =
        // [{"storeCartId":84654,"goodsCartIds":"289749,289748,289746,289745"},{"storeCartId": 84547, "goodsCartIds": "289635"},{"storeCartId": 84301, "goodsCartIds": "289372"},{"storeCartId": 84231, "goodsCartIds": "289301"}];
      [{"storeCartId": this.$route.params.orderId, "goodsCartIds":this.$route.params.orderIdd }];//"290592"
      const payInfos = JSON.stringify(info);
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
          var transIdd = 0;//快递默认第一个id
          var storeIdd = 0;//店铺id
          var transIddd = [];//快递列表(快递)

          this.storeCartListt.forEach(function (val,index) {
              totalPrice +=val.total_price;//累计总价
              transIdd +=val.store.transport_list[0].id;//快递id
              storeIdd +=val.store.id;//店铺id
              val.store.transport_list.forEach(function(vall , indexx){//快递列表
                transIddd.push(vall);
              })
          });
           this.AlltotalPrice =parseFloat(totalPrice);//临时总价
           this.transId =transIdd;//快递默认第一个id
           this.storeId =storeIdd;//店铺id
           this.transIdddd = transIddd;//快递列表
        })
        .catch(function(error) {
          console.log(error);
      });
    },
    sublimet(){
        var infoo = [{
          "storeCartId":this.$route.params.orderId,//店铺购物车id
          "goodsCartIds":this.$route.params.orderIdd,//,商品id
          "msg":this.msg,//,msg
          "addsId":this.addrss.id,//,地址id
          "transId":this.transId,//,快递id
          "totalPrice":this.AlltotalPrice,//,总价
          "storeId":this.storeId//,店铺id
        }]
        //店铺购物车id,商品id,msg,地址id,快递id,总价,店铺id
      var payInfos = JSON.stringify(infoo);
      axios
      .post(
        "/generate_order.htm",
        qs.stringify({
          payInfos,
          userId:this.userid,
        })
      )
      .then(res => {
        const { data } = res;
        const { msg, result, status } = data;
        console.log(res);
        this.orderIdss = res.data.result;
        console.log(this.orderIdss);
         
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    payingJifen(){
         // //积分支付
          axios
            .post(
              "/app_balance_payment.htm",
              qs.stringify({
                userId:this.userid, 
                orderIds: this.orderIdss
              })
            )
            .then(res => {
              const {status,msg,result}=res.data; 
              if(status==0){
                this.$router.replace({
                  path:'/cart',
                  name:'Cart',
                });
                Toast("订单支付成功");
              }else{
                Toast("订单支付失败");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
    },
     selectionConfirmShow(isAddToConfirm) {
      this.isAddToConfirm = isAddToConfirm;
      $(".transId").animate({ top: "0" }, 200);
    },
    selectionConfirmHide() {
      $(".transId").animate({ top: "19.2rem" }, 200);
    },

     selectionPayingShow(isAddToPaying) {
      this.isAddToPaying = isAddToPaying;
      $(".paying").animate({ bottom: "0" }, 200);
    },
    selectionPayingHide() {
      this.$router.replace({
        path:'/cart',
        name:'Cart',
      });
     Toast("订单已生成，请前往我的订单查看");
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


  .transId{
    position: fixed;
    width: 100%;
    top: 19.2rem;
    z-index: 999;
    background:#fff;
    height: 19.2rem;
    .header_transId{
      position: relative;
      height: 1.5rem;
      width: 100%;
      background:#f58b3d;
      .transId_heaImg{
        width: 0.36rem;
        height: 0.62rem;
        position: absolute;
        top: 0.44rem;
        left: 0.36rem;
        z-index: 999;
      }
      .header_H{
        height: 1.5rem;
        width: 100%;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.49rem;
        color: #fff;
      }
    }
    .transId_main{
      li{
        height: 1.5rem;
        border:.03rem solid #f2f2f2;
        width: 100%;
        position: relative;
        .transId_main_span{
          display: inline-block;
          line-height: 1.5rem;
          width: 6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: .5rem;
          white-space: nowrap;
        }
        .transId_main_span1{
          position: absolute;
          right: 2.4rem;
          display: inline-block;
          line-height: 1.5rem;
        }
        .transId_main_span2{
          position: absolute;
          right: .5rem;
          display: inline-block;
          line-height: 1.5rem;
        }
      }
    }
  }
  .paying{
    height: 11.1rem;
    width: 100%;
    background:#f9f9f9;
    position: fixed;
    bottom:-11.1rem;
    .paying_Img{
      height: 1.26rem;
      width: 100%;
      .paying_img{
        width: 0.7rem;
        height: 0.7rem;
        position: absolute;
        right: .5rem;
        top: 0.45rem;
      }
    }
    .paying_ul{
      margin-left:.3rem;
      li:nth-child(1){
        .paying_liIMG1{
          .paying_li_img{
            display: block;
          }
          .paying_li_border{
            display: none;
          }
        }
      }
      li{
        width: 10.2rem;
        height: 1.82rem;
        background:#fff;
        border-radius:.2rem .2rem;
        margin-top:.3rem;
        position: relative;
        .paying_liImg{
          height: 1.08rem;
          width: 1.08rem;
          display: inline-block;
          margin-left: .6rem;
          margin-top: .35rem;
          img{
            border-radius:.2rem .2rem;
          }
        }
        .paying_liIMG1{
            position: absolute;
            right: .3rem;
            top: .6rem;
            height: .6rem;
            width: .6rem;
            display: inline-block;
          .paying_li_img{
            height: .6rem;
            width: .6rem;
            display:none;
          }
          .paying_li_border{
            width: .4rem;
            height: .4rem;
            border: .1rem solid;
            border-radius: 50%;
          }
        }
        .paying_liSpan{
          font-size:.4rem;
          position: absolute;
          line-height: 1.82rem;
          left: 1.99rem;
        }
      }
      .paying_sub{
        height: 1.8rem;
        width: 10.2rem;
        background:#fe0002;
        color:#fff;
        outline: none;
        border: 0;
        margin-top:.75rem;
        font-size:.36rem;
      }
    }
  }
}
</style>
