<template>
  <div>
    <div class="sharedd">
      <div class="back-withe shar" onclick="window.history.go(-1)">
        <img src="../../assets/mIcon/title_back_white.png">
      </div>
      <div class="shar"><p>万手销量榜</p></div>
    </div>
    <div class="salesImg">
        <img src="../../assets/mIcon/img_ac_sales_list_bg.png">
    </div>
    <!-- tab切换 -->
    <div class="nav nav1">
       <mt-button size="small" @click.native.prevent="active='tab-container1'">日销量</mt-button>  <!--// @click="ChoiceType" :Choiced='0' -->
      <mt-button size="small" @click.native.prevent="active = 'tab-container2' ">月销量</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">年销量</mt-button>  
      <mt-button size="small" @click.native.prevent="active = 'tab-container4'">总销量</mt-button>
    </div>  
      
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" ><!-- swipeable -->
        <mt-tab-container-item id="tab-container1">
            <!-- cell组件 -->
            
          <mt-cell v-for="(data,index) in daySalesVolume" :key="index">
              <div class="salesVolumeImg" @click="goto_detailSales(data[0])">
                  <img :src="'http://www.d1sc.com/'+changeData(data[4],data[5])">
              </div>
              <div class="salesVolumeP" @click="goto_detailSales(data[0])">
                  <p>{{data[1]}}</p>
                  <span class="salesPrice">￥{{data[3] | formatMoney()}}</span>
                  <div class="salesVB">
                    <span class="salesV">销量:{{data[2]}}</span>
                    <mt-button type="danger" class="salesButton">进入</mt-button>
                    <span class="salesTime">2018-4-20</span>
                  </div>
              </div>
          </mt-cell>  
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
            <!-- cell组件 -->
          <mt-cell v-for="(data,index) in daySalesVolume" :key="index">
              <div class="salesVolumeImg" @click="goto_detailSales(data[0])">
                  <img :src="'http://www.d1sc.com/'+changeData(data[4],data[5])">
              </div>
              <div class="salesVolumeP" @click="goto_detailSales(data[0])">
                  <p>{{data[1]}}</p>
                  <span class="salesPrice">￥{{data[3] | formatMoney()}}</span>
                  <div class="salesVB">
                    <span class="salesV">销量:&nbsp;{{data[2]}}</span>
                    <mt-button type="danger" class="salesButton">进入</mt-button>
                  </div>
              </div>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
            <!-- cell组件 -->
          <mt-cell v-for="(data,index) in daySalesVolume" :key="index">
              <div class="salesVolumeImg" @click="goto_detailSales(data[0])">
                  <img :src="'http://www.d1sc.com/'+changeData(data[4],data[5])">
              </div>
              <div class="salesVolumeP" @click="goto_detailSales(data[0])">
                  <p>{{data[1]}}</p>
                  <span class="salesPrice">￥{{data[3] | formatMoney()}}</span>
                  <div class="salesVB">
                    <span class="salesV">销量:&nbsp;{{data[2]}}</span>
                    <mt-button type="danger" class="salesButton">进入</mt-button>
                  </div>
              </div>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container4">
            <!-- cell组件 -->
          <mt-cell v-for="(data,index) in alwaysSalesVolume" :key="index">
             <div class="salesVolumeImg" @click="goto_detailSales(data.id)">
                 <img :src="'http://www.d1sc.com/'+changeData(data.goods_main_photo
.path,data.goods_main_photo.name)">
             </div>
              <div class="salesVolumeP" @click="goto_detailSales(data.id)">
                  <p>{{data.goods_name}}</p>
                  <span class="salesPrice">￥{{data.store_price | formatMoney()}}</span>
                  <div class="salesVB">
                    <span class="salesV">销量:&nbsp;{{data.goods_salenum}}</span>
                    <mt-button type="danger" class="salesButton">进入</mt-button>
                  </div>
              </div>
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>  
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      active: "tab-container1",
      daySalesVolume: [], //销量
      alwaysSalesVolume: [], //总销量
      choice:0,
      id:"",//详情页id
    };
  },
  watch:{
    active:function(){
      if(this.active=='tab-container1'){
        this.choice=0;
        this.path();
      }
      else if(this.active=='tab-container2'){
        this.choice=1;
        this.path();
      }
           else if(this.active=='tab-container3'){
        this.choice=2;
        this.path();
      }else if(this.active=='tab-container4'){
        this.allPath();
      }
    }
  },
  methods: {
    goto_detailSales(id) {
      //跳转到详情页
      console.log(id);
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: { id: id }
      });
    },
    //数据获取
    path() {
      axios
        .post(
          "/appGainGoodSequence.htm",
          qs.stringify({
            Choice: this.choice //日销量
            // "currentPage":1,
          })
        )
        .then(res => {
          console.log(res);
          this.daySalesVolume = res.data.result;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  allPath(){
      axios
        .post("/appGetGoodsSequence.htm", qs.stringify({}))
        .then(res => {
          console.log(res);
          this.alwaysSalesVolume = res.data.result;
          console.log((this.alwaysSalesVolume = res.data.result));
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //自定义方法
    salesTab: function() {
      $(".nav .mint-button:first").addClass("active");
      $(".nav .mint-button").click(function() {
        $(".nav .mint-button").removeClass("active");
        $(this).addClass("active");
        return false;
      });
    }
  },
  updated() {
    //只要数据变化就会判断一次数据是否已读过，判断标记的显隐
  },
  created() {
    //打开页面首先自动获取一次数据
    this.path();
  },
  mounted(){
    this.salesTab();
  }
 
};
</script>
<style lang='scss'>
@import "../../../static/style/css/salesProfit.css";
.active {
  color: #db1a1a;
  border-bottom: 0.06rem solid #db1a1a;
}
.nav1 {
  .mint-button-text {
    display: block;
    line-height: .9rem;
    font-size: .34rem;
  }
}
</style>
