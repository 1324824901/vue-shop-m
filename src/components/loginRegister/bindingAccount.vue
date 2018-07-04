<template>
  <div>
      <div class="binding">
          <div class="bingdingImg">
              <img src="../../assets/mIcon/title_back_normal.png" alt="">
          </div>
          <p>绑定已有账号</p>
      </div>
    <div class="bingdingMain">
    <p class="bindingPPP">已经有万手账号，直接绑定</p>
      <div class="bingdingIpt">
          <div class="bingdingBackImg"></div>
          <input type="text" placeholder="请输入您的用户名、万手号或手机号">
        </div>
        <div class="bingdingIpt">
          <div class="bingdingBackImg1"></div>
          <input type="text" placeholder="请输入您的密码   " class="bingdingIpt1">
        </div>
          <mt-button type="primary" class="bingding_VV">绑定</mt-button>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
@import "../../../static/style/css/bindingAccount.css"
</style>