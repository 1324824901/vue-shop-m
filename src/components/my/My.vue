<template>
<div>
    <div class="myHead">
      <img src="../../assets/mIcon/img_mine_bg.png" alt="">
      <div class="myHeadUser">
          <div class='myHeadUserImg'>
              <img v-if="userIDd.photo" :src="'http://www.d1sc.com/'+changeData(userIDd.photo.path,userIDd.photo.name)" alt="">
          </div>
          <div class="myHeadUserName">
            <p>{{userIDd.userName}}</p>
            <p>万手号：{{userIDd.id}}</p>
            <p>动态值：{{Math.round(userIDd.availableBalance)}}</p>
          </div>
          <div class="myHeadCodeFizz">
            <div class="qrCode">
              <img src="../../assets/mIcon/ic_erm.png" alt="">
            </div>
            <p class='fizz'>活跃度：{{userIDd.appClickapps}}</p>
          </div>
      </div>
    </div>
    <div class="myMain">
      <!-- 1 -->
      <div class="main1">
        <p class="p1">商城订单</p>
        <router-link to="/my/myorder"><p class="p2">查看所有订单</p></router-link>
        <p class="p3"><img src="../../assets/mIcon/title_back_normal.png" alt=""></p>
      </div>
      <!-- 2 -->
      <div class="main2">
        <ul>
            <li><div style="width:.7rem; height:.72rem; margin:.58rem 1rem 0 1rem;"><img src="../../assets/mIcon/paying.png" alt=""></div></li>
            <li><div  style="width:.7rem; height:.67rem; margin:.64rem 1rem 0 1rem;"><img src="../../assets/mIcon/sending.png" alt=""></div></li>
            <li><div style="width:.7rem; height:.6rem; margin:.69rem 1rem 0 1rem;"><img src="../../assets/mIcon/receiving.png" alt=""></div></li>
            <li><div style="width:.69rem; height:.64rem; margin:.67rem 1rem 0 1rem;"><img src="../../assets/mIcon/refund.png" alt=""></div></li>
        </ul>
        <div class="main2-1">
          <p>待付款</p>
          <p>待发货</p>
          <p>待收货</p>
          <p>退款/售后</p>
        </div>
      </div>
      <!-- 3 -->
      <div class="main3">
        <p>基础功能</p>
      </div>
      <!-- 4 -->
      <div class="main4">
          <ul class="main4-1">
            <li class="li1"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li>
            <router-link to="/address"><li class="li2"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li></router-link>
            <li class="li3"><img src="../../assets/mIcon/ic_personal_mall.png" alt=""></li>
            <li class="li4"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li>
          </ul>
          <ul class="main4-2">
            <li><p>第一商城</p></li>
            <router-link to="/address"><li>地址</li></router-link>
            <li><p>我的商城</p></li>
            <li><p>我的商品</p></li>
          </ul>
          <ul class="main4-3">
            <li class="li5"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li>
            <li class="li6"><img src="../../assets/mIcon/ic_payment_details.png" alt=""></li>
            <li class="li7"><img src="../../assets/mIcon/ic_position_management.png" alt=""></li>
            <li class="li8"><img src="../../assets/mIcon/mine_set.png" alt=""></li>
          </ul>
          <ul class="main4-4">
            <li><p>拓客系统</p></li>
            <li><p>收支明细</p></li>
            <li><p>职位管理</p></li>
            <router-link to="./my/shezhi"><li><p>设置</p></li></router-link>
          </ul>
      </div>
    <!-- 5 -->
      <div class="main5">
        <p>特色功能</p>
      </div>
      <!-- 6 -->
      <div class="main4">
          <ul class="main4-1 main4-1-1">
            <li class="li9"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li>
            <li class="li10"><img src="../../assets/mIcon/ic_mine_session.png" alt=""></li>
            <li class="li11"><img src="../../assets/mIcon/ic_mine_points_out.png" alt=""></li>
            <li class="li12"><img src="../../assets/mIcon/ic_mine_share.png" alt=""></li>
          </ul>
          <ul class="main4-2">
            <li><p>抢占首页</p></li>
            <li><p>会话</p></li>
            <li><p>积分</p></li>
            <li><p>分享</p></li>
          </ul>
          <ul class="main4-3">
            <router-link to="./my/auction"><li class="li13"><img src="../../assets/mIcon/ic_first_mall.png" alt=""></li></router-link>
            <li class="li14"><img src="../../assets/mIcon/ic_mine_princes_college.png" alt=""></li>
            <li class="li15"><img src="../../assets/mIcon/ic_mine_airlines.png" alt=""></li>
            <router-link to="./my/bonus"><li class="li16"><img src="../../assets/mIcon/ic_mine_red_envelope.png" alt=""></li></router-link>
          </ul>
          <ul class="main4-4">
            <router-link to="./my/auction"><li><p>拍卖</p></li></router-link>
            <li><p>将帅学院</p></li>
            <li><p>客服中心</p></li>
            <router-link to="./my/bonus"><li><p>招兵红包</p></li></router-link>
          </ul>
      </div>
<!-- 7 -->
<div class="main7">我也是有底线的哈~~</div>

    </div>
         <!-- 底部导航 -->
    <div class="tabfoot" >
          <ul class="tabfoot1">
            <router-link to="/"><li class="footImg1">
              <img src="../../assets/mIcon/ic_homepage_gray.png">
              <img src="../../assets/mIcon/ic_homepage_green.png" class="footImg2">
              <p>万手</p>
            </li></router-link>
            <router-link to="./cart"><li class="footImg1">
              <img src="../../assets/mIcon/ic_discover_gray.png">
              <img src="../../assets/mIcon/ic_discover_red.png" class="footImg2">
              <p>购物车</p>
            </li></router-link>
            <li class="footImg1">
              <img src="../../assets/mIcon/ic_person_gray.png">
              <img src="../../assets/mIcon/ic_person_red.png">
              <p class="footP">我的</p>
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
        userIDd:'',
    }
  },
    //挂载用户名
    beforeMount(){
      this.userid=localStorage.userid;
    },
    mounted(){
    this.LoderPath();
    },
    methods:{
      LoderPath() {
      axios
      .post("/get_userInfo.htm", qs.stringify({
        user_id: this.userid
        }))
        .then(res => {
          console.log(res);
          this.userIDd = res.data.result;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
    },
};

</script>

<style>
@import "../../../static/style/css/my.css";
</style>
