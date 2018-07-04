<template>
  <div>
    <div class="loginHead">
      <p>登录</p>
    </div>
    <div class="regMain">
        <div class="regIpt">
          <div class="regBackImg11"></div>
          <input type="text" placeholder="请输入您的用户名、万手号或手机号" class="ipt2"  v-model="searchValue">
        </div>
        <div class="regIpt">
          <div class="regBackImg1"></div>
          <input type="password" placeholder="请输入您的密码" v-model="password" class="ipt3" >
        </div>
        <mt-button type="primary" class="regFootBtn" @click="headelSubmit">登录</mt-button>
        <div class="forgetPass" @click="WantPassword">忘记密码？</div>
        <p>还没有账号吧？ 来 <router-link to='./register'><span>注册</span></router-link> 吧！</p>
        <div class="otherLogin">其他登录方式</div>
        <div class="loginImg">
          <img src="../../assets/mIcon/weixin.png" alt="">
        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import {setCookie,getCookie} from '../../assets/js/cookie.js';
import { Toast } from 'mint-ui';
export default {
   mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('searchValue')){
        this.$router.push('/');
    }
  },
   data () {
  return {
       searchValue:'',//用户名
       password:'',//密码
  }
},
methods:{
  WantPassword(){
    Toast("请下载万手app找回密码");
  },
  headelSubmit(){
    if(this.searchValue == ""){
      Toast("用户名,手机号或万手号不能为空");
    }else if( this.password == ""){
        Toast("密码不能为空");
    }
    else{
      let data=qs.stringify({
         searchValue:this.searchValue,
         password:this.password
        })
      console.log(data);
    axios
      .post(
        "/api_login.htm",data
      )
      .then(res => {
        console.log(res);
        let dataa = res.data.status;
        if(dataa==1){
          Toast("账户密码不匹配");
        }else{
          Toast("登陆成功");
          localStorage.setItem('userid',res.data.result.id);
          setCookie('searchValue',this.searchValue,1000*60)
            setTimeout(function(){
                this.$router.push('/');
            }.bind(this),1000)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
}
};
</script>
<style>
@import "../../../static/style/css/login.css";
</style>
