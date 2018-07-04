<template>
  <div class="address_chr">
    <div class="HeadAddress">
      <div class="HeadImg">
        <img src="../../assets/mIcon/title_back_white.png" alt="">
      </div>
      <div class="HeadP">编辑地址</div>
    </div>
    <div class="address_chrMain">
      <h3 class="address_chrMainLi">添加收货地址:</h3>
      <ul class="address_chrMainUl">
        <li><span>收件人：</span><span><input type="text" placeholder="姓名"v-model="trueName"></span></li>
        <li><span>手机号码：</span><span><input type="text" placeholder="手机号码"v-model="mobile"></span></li>
        <li><span>所在地区：</span><span><input type="text" placeholder="选择区域地址" @click="sjld()" :value="address"></span></li>
        <li><span>详细地址：</span><span><input type="text" placeholder="街道、小区、门牌号"></span></li>
      </ul>
      <div class="confirmButton">
        <button type="button" class="confirmButton1"@click="save()">保存</button>
      </div>
    </div>

    <div class="addrChoose" ref="choose1"></div>
    <div class="addrChoose1"ref="choose2">
      <div class="addrChoose2">
        <span class="addrChoose3">所在地区</span>
        <div class="detailMain3s_selection1X">
          <img src="../../assets/mIcon/xx.png" @click="close"alt="">
        </div>
      </div>
      <div class="title">
        <div class="area" style="color:red;">
          请选择
        </div>
        <div class="area">
          请选择
        </div>
        <div class="area">
          请选择
        </div>
      </div>
      <div>
        <ul class="addrDetailContent">
          <li v-for="a in 10">
            安徽省
          </li>
          <li v-for="a in 10">
          </li>
          <li v-for="a in 10">
          </li>
        </ul>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
  import axios from "axios";
  import qs from "qs";
  export default {
    data(){
      return{
        trueName:"",
        mobile:"",
        address:"",
        info:{
            user_id:"",
            trueName:"",
            mobile:"",
            address:"",
            province:"",
            city:"",
            county:"",
            addressId:""
        },
      }
    },
//挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
  },
    methods:{
        save(){
          this.info.trueName=this.trueName;
          this.info.mobile=this.mobile;
          this.info.address=this.address;
          this.info.city="北京市";
          this.info.province="北京市";
          this.info.county="北京市";
          this.info.addressId=4521984;
          var that=this;
           // {trueName=姜伟, address=好死不死博大精深, province=河北省, user_id=134923, city=唐山市, mobile=15212774237, county=路南区, addressId=4522050}
          axios.post(
            "/app_save_add.htm",
            qs.stringify({
              user_id:this.userid,
              trueName:this.info.trueName,
              mobile:this.info.mobile,
              address:this.info.address,
              province:this.info.province,
              city:this.info.city,
              county:this.info.county,
              addressId:this.info.addressId
            })
          ).then(res=>{
          }).catch(function(err){
            console.log(err);
          });
        },
        sjld(){
          var that=this;
          this.$refs.choose1.style.display="block";
          this.$refs.choose2.style.display="block";
          axios.post(
            "/appAddressLinkage.htm",
            qs.stringify({
             addressId:4521984
            })
          ).then(res=>{
            let {result} = res.data;
            that.address=result[0].areaName;
          }).catch(function(err){
            console.log(err);
          })
        },
      close(){
        this.$refs.choose1.style.display="none";
        this.$refs.choose2.style.display="none";
      }
    },
  };
</script>

<style lang="scss">
  .address_chr{
    .HeadAddress{
      position: relative;
      height:1.5rem;
      width:100%;
      background:#f58b3d;
      .HeadImg{
        width:.36rem;
        height:.62rem;
        position: absolute;
        top:.44rem;
        left:.36rem;
        z-index:999;
      }
      .HeadP{
        height:1.5rem;
        width: 100%;
        line-height:1.5rem;
        text-align: center;
        font-size:.49rem;
        color:#fff;
      }
    }

    .address_chrMain{
      .address_chrMainLi{
        font-size: .49rem;
        line-height: 1.98rem;
        margin-left: .41rem;
      }
      .address_chrMainUl{
        li{
          position: relative;
          line-height: 1.5rem;
          .contImg{
            position: absolute;
            width: .3rem;
            height: 0.4rem;
            right: 1.5rem;
            bottom: 1.1rem;
          }
          span:nth-child(1){
            width: 2.1rem;
            display: inline-block;
            font-size: .42rem;
            margin-left:.41rem;
          }
          span:nth-child(2){
            display: inline-block;
            height: .74rem;
            border-bottom: .02rem solid #f2f2f2;
            line-height: .5rem;
            margin-left: 1.06rem;
            width: 6rem;
            input{
              outline: none;
              border: 0;
              margin-left:0.43rem;
              background: #fff;
            }
          }

        }

      }
      .confirmButton{
        button{
          width: 9.9rem;
          height:1.45rem;
          border-radius:.2rem .2rem;
          background:#fa7a1f;
          outline:none;
          border:0;
          color:#fff;
          font-size:.42rem;
          margin-top:2.8rem;
          margin-left: .45rem;
        }
      }
    }
    .addrChoose{
      position: fixed;
      z-index: 998;
      width: 100%;
      height: 19.2rem;
      background: #3f3838;
      opacity: 0.5;
      top: 0;
      display:none;
    }
    .addrChoose1{
      display:none;
      height: 11.66rem;
      width:100%;
      background:#fff;
      position: fixed;
      bottom:0;
      z-index: 999;
      .addrChoose2{
        height: 2.65rem;
        width:100%;
        position: relative;
        #option{
          font-size:.41rem;
          color:red;
          position: absolute;
          left:.49rem;
          bottom:.6rem;
        }
        .addrChoose3{
          text-align: center;
          display: block;
          font-size: .46rem;
          margin-top: .5rem;
          color: #929292;
        }
        .detailMain3s_selection1X {
          width: 0.7rem;
          height: 0.7rem;
          position: absolute;
          right: .5rem;
          top: 0;
        }
      }
      .addrDetailContent{
        li{
          height: 1.2rem;
          width:100%;
          border-top:.02rem solid #f3f3f3;
          option{
            line-height: 1.2rem;
            margin-left:.62rem;
          }

        }
      }
    }

  }
</style>
