<template>
  <div>
    <div class="notLoginImg">
      <img src="../../assets/mIcon/img_dis_denglu.png" alt="">
    </div>
    <p>未登录</p>
    <router-link to='./login'><mt-button type="primary" size="large">登录</mt-button></router-link>
    <router-link to='./register'><mt-button type="primary" size="large">注册</mt-button></router-link>
  </div>
</template>

<script>
export default {
data(){
  return{
    
  }
}
};
</script>

<style>
    @import "../../../static/style/css/notlogin.css";
</style>
