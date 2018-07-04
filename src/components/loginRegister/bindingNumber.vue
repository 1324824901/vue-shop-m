<template>
  <div>
      <div class="binding">
          <div class="bingdingImg">
              <img src="../../assets/mIcon/title_back_normal.png" alt="">
          </div>
          <p>绑定手机号</p>
      </div>

    <div class="bingdingMain">
      <div class="bingdingIpt">
          <div class="bingdingBackImg"></div>
          <input type="text" placeholder="选填项：请输入担保人用户名或万手号">
        </div>
        <div class="bingdingIpt">
          <div class="bingdingBackImg1"></div>
          <input type="text" placeholder="请输入手机号码" class="bingdingIpt1">
        </div>
        <div class="bingdingIpt">
          <div class="bingdingBackImg2"></div>
          <input type="text" placeholder="请输入验证码">
          <mt-button type="primary" class="bingdingV">获取验证码</mt-button>
        </div>
          <mt-button type="primary" class="bingding_VV">绑定</mt-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../../../static/style/css/bindingNumber.css"
</style>
