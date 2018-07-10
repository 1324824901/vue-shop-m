<template>
  <div>
     <div class="header">
        <router-link to="."><div class="headerImg hh">
         <img src="../../assets/mIcon/title_back_white.png" alt="">
        </div></router-link>
        <p class="headerP hh">
         设置
        </p>
    </div>
        <span @click="loginOut()" style="position:fixed;z-index:999;font-size:80px;">登出</span>
  </div>
</template>
<script>
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
export default {
    data(){
        return{
        }
    },
    methods:{
        loginOut(){
          localStorage.userid='';
          setCookie('searchValue', "", -1);  
          history.go(0);
        },
    }
};
</script>

<style lang='scss'>
@import "../../../static/style/sass/_header.scss";
</style>
