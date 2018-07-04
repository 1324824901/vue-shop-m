<template>
  <div>
    <div class="register">
      <div class="back-withe regHead">
        <img src="../../assets/mIcon/title_back_white.png">
      </div>
      <span class="regHead registerHead">注册</span>
    </div>

    <div class="regMain">
        <div class="regIpt">
          <div class="regBackImg"></div>
          <input type="text" placeholder="请输入用户名" class="ipt1" v-model="userName">
        </div>
        <div class="regIpt">
          <div class="regBackImg1"></div>
          <input type="text" placeholder="请输入手机号码" v-model="mobile">
        </div>
        <div class="regIpt">
          <div class="regBackImg2"></div>
          <input type="text" placeholder="请输入您的密码" v-model="password">
        </div>
        <div class="regIpt">
          <div class="regBackImg3"></div>
          <input type="text" placeholder="请确认您的密码" v-model="password1">
        </div>
        <div class="regIpt">
          <div class="regBackImg4"></div>
          <input type="text" placeholder="请输入担保人名称" v-model="dan_bao_ren">
        </div>
        <div class="regIpt">
          <div class="regBackImg5"></div>
          <input type="text" placeholder="请输入验证码" class="regValidate" v-model="verificationCode">
          <span v-show="sendAuthCode" class="auth_text"  @click="getSafeCode">获取验证码</span>
          <span class="auth_text_blue" v-show="!sendAuthCode">{{auth_time}}秒之重新获取</span>
        </div>
        <mt-button type="primary" class="regFootBtn" @click="headelSubmitReg">注册</mt-button>
        <p>已有账号？ 来 <router-link to="./login"><span>登录</span></router-link> 吧！</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Toast } from 'mint-ui';
export default {
  data(){
    return{
      userName:'',
      password:'',
      password1:'',
      mobile:'',
      dan_bao_ren:'',
      verificationCode:'', 
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      recNum:'',
    }
  },
  methods:{
    headelSubmitReg(){
      if(this.userName == ""){
        Toast('请输入用户名');
      }else if(this.mobile == ""){
        Toast('请输入手机号');
      }else if(this.password == ""){
        Toast('请输入密码');
      }else if(this.password1 == ""){
        Toast('请确认密码');
      }else if(this.password !== this.password1){
        Toast('请确认相同密码');
      }else if(this.verificationCode == ""){
        Toast('请输入验证码');
      }else{
        let data=qs.stringify({
           userName:this.userName,
           password:this.password,
           mobile:this.mobile,
           dan_bao_ren:this.dan_bao_ren,
           verificationCode:this.verificationCode,
          })
          console.log(data);
      axios
        .post(
          "/api_regist.htm",data
        )
        .then(res => {
          console.log(res);
          let dataa = res.data.status;
          let dataB = res.data.msg;
          if(dataB=="号码已存在或者号码格式不正确"){
            Toast('号码已存在或者号码格式不正确');
          }else if(dataB=="验证码错误"){
            Toast('验证码错误');
          }else if(dataa==1){
            Toast('注册失败请重新注册');
          }else{
              Toast('注册成功请登录');
              this.$router.push('/login');
          }
        })
        .catch(function(error) {
          console.log(error); 
        });
      }
    },
    //短信验证码
    getSafeCode(){
      this.sendAuthCode = false;
        this.auth_time = 40;
        var auth_timetimer =  setInterval(()=>{
            this.auth_time--;
            if(this.auth_time<=0){
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
            }
        }, 1000);
        let data=qs.stringify({
           recNum:this.mobile,
          })
        console.log(data);
      axios
        .post(
          "/get_safe_code.htm",data
        )
        .then(res => {
          console.log(res);
          let nCode = res.data.status;
          if(nCode==1){
            Toast('获取验证码已超过今日次数');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>

<style>
@import "../../../static/style/css/register.css";
.auth_text{
  background: #f97719;
  height: 1.5rem;
  display: inline-block;
  line-height: 1.5rem;
  width: 3.6rem;
  border-radius: 2%;
  text-align: center;
  font-size: 0.44rem;
  color: #fff;
}
.auth_text_blue{
  background: #ccc;
  height: 1.5rem;
  display: inline-block;
  line-height: 1.5rem;
  width: 3.6rem;
  border-radius: 2%;
  text-align: center;
  font-size: 0.44rem;
  color: #fff;
}
</style>
