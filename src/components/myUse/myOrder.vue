<template>
  <div>
    <div class="header">
       <div class="headerImg hh" onclick="window.history.go(-1)">
            <img src="../../assets/mIcon/title_back_white.png" alt="">
       </div>
       <p class="headerP hh">
         我的订单
       </p>
       <div class="headerImgSousuo hh">
            <img src="../../assets/mIcon/sousuo.png" alt="">
       </div>
    </div>

    <div class="nav nav1">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">全部</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">待付款</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">已发货</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container4'">已收货</mt-button>
    </div>

    <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
            <mt-cell>
                <div class="orderMain"v-for="item in order">
                    <div>{{order.length}}</div>
                    <p>你还没有相关订单</p>
                    <p>可以逛逛有哪些想买的</p>
                </div>
            </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
            <mt-cell>
                <div class="orderMain"v-for="item in order1">
                    <div>{{order1.length}}</div>
                    <p>你还没有相关订单</p>
                    <p>可以逛逛有哪些想买的</p>
                </div>
            </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
            <mt-cell>
                <div class="orderMain"v-for="item in order2">
                    <div>{{order2.length}}</div>
                    <p>你还没有相关订单</p>
                    <p>可以逛逛有哪些想买的</p>
                </div>
            </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container4">
            <mt-cell>
                <div class="orderMain"v-for="item in order3">
                    <div>{{order3.length}}</div>
                    <p>你还没有相关订单</p>
                    <p>可以逛逛有哪些想买的</p>
                </div>
            </mt-cell>
        </mt-tab-container-item>
    </mt-tab-container>

 </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
export default {
  data() {
    return {
      active: "tab-container1",
      order1:[],
      order2:[],
      order3:[],
      order:[],
      addTime:"",
      addr:null,
      gcs:[],
      goods_amount:0,
      msg:"",
      order_id:"",
      order_status:0,
      store:{
        id:0,
        store_name:"",
        store_telephone:0,
      },
      user:{
        id:0,
        mobile:0,
        userName:""
      }
    };
  },
  watch: {
    active: function() {
      if (this.active == "tab-container1") {
        // this.path();
      } else if (this.active == "tab-container2") {
        this.choice = 1;
        // this.path();
      } else if (this.active == "tab-container3") {
        this.choice = 2;
        // this.path();
      } else if (this.active == "tab-container4") {
        // this.allPath();
      }
    }
  },
  methods: {
    //切换、
    orderTab: function() {
      $(".nav .mint-button:first").addClass("active");
      $(".nav .mint-button").click(function() {
        $(".nav .mint-button").removeClass("active");
        $(this).addClass("active");
        return false;
      });
    },
    orderList(){
      var that=this;
      axios
        .post(
          "/api_order_detail.htm",
          qs.stringify({
           order_id:83983
          })
        ).then(
        res=>{
          const {result}=res.data;
          console.log(result);
          that.addTime=result.addTime;
          that.addr=result.addr;
          that.gcs=result.gcs;
          that.goods_amount=result.goods_amount;
          that.msg=result.msg;
          that.order_id=result.order_id;
          that.order_status=result.order_status;
          that.store=result.store;
          that.user=result.user;
          result.gcs.forEach(function(item){
            if(item.order_status!=0) {
               that.order.push(item);
              if (item.order_status == 10) {
                that.order1.push(item);
              } else if (item.order_status == 40) {
                that.order3.push(item);
              } else if (item.order_status == 30) {
                that.order2.push(item);
              }
            }
          })

        }
      ).catch(function(err){
        console.log(err);
      })
    }
  },
  mounted() {
    this.orderTab();
    this.orderList();
  }
};
</script>

<style lang="scss">
@import "../../../static/style/sass/_header.scss";
.nav {
  height: 1.38rem;
  .mint-button--small {
    float: left;
    display: inline-block;
    font-size: 0.41rem;
    padding: 0;
    height: 1.38rem;
    width: 2.7rem;
    border-radius: 0;
    background-color: #fff;
    box-shadow: none;
  }
}
.active {
  color: #db1a1a;
  border-bottom: 0.06rem solid #db1a1a;
}
.nav1 {
  .mint-button-text {
    display: block;
    line-height: 1.35rem;
  }
}
</style>
