<template>
<div>
      <div class="header">
        <div class="headerImg hh" onclick="window.history.go(-1)">
            <img src="../../assets/mIcon/title_back_white.png" alt="">
        </div>
        <p class="headerP hh">
            评价
        </p>
      </div>

     <div class="detailEvaluationMain">
        <ul class="detailEvaluationTabTitle">
          <li>全部({{evaluation.evaluateSum}})</li>
          <li>好评({{evaluation.praiseNum}})</li>
          <li>中评({{evaluation.commonlyNum}})</li>
          <li>差评({{evaluation.badNum}})</li>
        </ul>


        <div class="detailEvaluationTabMain1" v-if="evaluation.evaluate==null">
            <div>
                <img src="../../assets/mIcon/img_null_goods.png" alt="">
            </div>
            <p class="p1">没有找到相关数据哦</p>
            <p class="p2">你可以去别的地方看看</p>
            <button>重新加载</button>
        </div>


        <ul class="detailEvaluationTabMain2" v-if="evaluation.evaluate!=null">
            <li v-for="(data,index) in evaluationList" :key="index">
                <div class="detailEvaluationTabMain2Img">
                    <img :src="'http://www.d1sc.com/'+changeData(data.user.photo.path,data.user.photo.name)" alt="">
                </div>
                <p class="detailEvaluationTabMain2P">{{data.user.userName}}</p>
                <div class="detailEvaluationTabMain2Span">
                    <span class="detailEvaluationTabMain2Span1"><img src="../../assets/mIcon/Pentagram.png" alt=""></span>
                    <span class="detailEvaluationTabMain2SpanTime">{{data.assessingDiscourse.assessingTime}}</span>
                </div>
                <p class="detailEvaluationTabMain2P1">{{data.assessingDiscourse.assessingCharacter}}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
    data(){
        return{
            goodsId: "", //商品id
            evaluationList:[],//评价列表内容
            evaluation:"",
            id:''
        }
    },
    computed:{
       
    },
    mounted() {
    this.evaluationn();
    this.fetchDataa();
    },
    methods:{
        fetchDataa() {
      axios
        .post(
          "/api_goods_detail.htm",
          qs.stringify({
            id: this.$route.params.id
          })
        )
        .then(res => {
          console.log(res);
          this.evaluation = res.data.result.appEvaluateData; //评价
        })
        .catch(function(error) {
          console.log(error);
        });
    },
        evaluationn(){
            axios
            .post(
            "/appGetGoodsEvaluates.htm",
            qs.stringify({
                goodsId:this.$route.params.goodsId
            })
            )
            .then(res => {
            console.log(res);
            this.evaluationList = res.data.result; //评价
            })
            .catch(function(error) {
            console.log(error);
            });
        },
    },
};
</script>

<style lang='scss'>
@import "../../../static/style/sass/_header.scss";
.detailEvaluationMain {
    background: #fafafa;
  .detailEvaluationTabTitle {
    height: 2.63rem;
    border-bottom: 0.03rem solid #f2f2f2;
    li {
      width: 1.89rem;
      height: 0.74rem;
      background: #fecccb;
      border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
      float: left;
      text-align: center;
      line-height: 0.74rem;
      margin-left: 2.4rem;
      margin-top: 0.36rem;
    }
  }
  .detailEvaluationTabMain1 {
    width: 100%;
    text-align: center;
    div {
      width: 3.08rem;
      height: 2.5rem;
      margin: 3.23rem 0 0.65rem 4rem;
    }
    .p1 {
      font-size: 0.45rem;
      margin-bottom: 0.2rem;
    }
    .p2 {
      font-size: 0.38rem;
      color: #999999;
      margin-bottom: 0.3rem;
    }
    button {
      border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
      border: 0;
      background: #fff;
      border: 0.02rem solid #999999;
      width: 2.04rem;
      height: 0.87rem;
      font-size: 0.34rem;
      outline: none;
    }
  }
  .detailEvaluationTabMain2{
      li{
         margin-top: .21rem;
         position: relative;
         background: #fff;
         .detailEvaluationTabMain2Img{
             position: absolute;
             width: .72rem;
             height: .72rem;
             top: .46rem;
             left: .39rem;
             img{
                 border-radius: 100%;
             }
         }
         .detailEvaluationTabMain2P{
             left: 1.5rem;
             top: .36rem;
             position: absolute;
             font-size: .25rem;
         }
         .detailEvaluationTabMain2Span{
             .detailEvaluationTabMain2Span1{
                 left: 1.2rem;
                 top: .85rem;
                 position: relative;
                 width: .5rem;
                 height: .5rem;
                 display: inline-block;
                 margin-left: .25rem;
             }
             .detailEvaluationTabMain2SpanTime{
                 position: absolute;
                 color: #999999;
                 font-size: .35rem;
                 right: .4rem;
                 top: .7rem;
             }
         }
         .detailEvaluationTabMain2P1{
            font-size: .38rem;
            margin-top: 1rem;
            margin-left: 1.3rem;
            width: 7rem;
            padding-bottom: .2rem;
         }
      }
  }
}
</style>
