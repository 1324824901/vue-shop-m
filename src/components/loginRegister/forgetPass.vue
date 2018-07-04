<template>
  <div>
      <div class="fpHead">
          <div class="fp_left"><img src="../../assets/mIcon/title_back_white.png" alt=""></div>
          <p>忘记密码</p>
      </div>
        <div class="fpMain">
      <div class="fpIpt">
          <div class="fpBackImg"></div>
          <input type="text" placeholder="请输入您的用户名、万手号或手机号">
        </div>
        <div class="fpIpt">
          <div class="fpBackImg1"></div>
          <input type="text" placeholder="请输入验证码" class="fpIpt1">
        </div>
          <mt-button type="primary" class="fp_V">获取验证码</mt-button>
          <mt-button type="primary" class="fp_VV">确认</mt-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../../../static/style/css/forgetPass.css"
</style>
