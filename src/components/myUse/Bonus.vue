<template>
  <div class="a">
      <div class="bonusHead">
          <div class='bonusHeadImg'>
              <router-link to="/my"><img src="../../assets/mIcon/title_back_white.png" alt=""></router-link>
          </div>
          <div><p>发红包</p></div>
      </div>
      <div class="bonusMain">
            <div class="bonusMainIpt bonusIpt">
                <span>单笔金额</span>
                <span><input type="text"></span>
                <span>元</span>
            </div>
            <div class="bonusMainIpt bonusIpt">
                <span>红包个数</span>
                <span><input type="text"></span>
                <span>个</span>
            </div>
            <div class="bonusMainIpt bonusMiPt">
                <span>留言：</span>
                <span><input type="text" placeholder="开通万手，大吉大利"></span>
            </div>
            <p class="MainMon">￥&nbsp;0.00</p>
            <mt-button type="primary">塞钱进红包</mt-button>
            <p class="MainText">若红包三日内未领取完，红包剩余金额将被退回</p>
            <router-link to=""><p class="Main-text">红包记录</p></router-link>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../../../static/style/css/bonus.css";
</style>
