<template>
  <div class="address">
    <div class="HeadAddress">
      <div class="HeadImg">
        <img src="../../assets/mIcon/title_back_white.png" alt="">
      </div>
      <div class="HeadP">收货地址</div>
    </div>
    <div class="mainAddress">
      <ul class="ListUl">
        <!-- <router-link  to="/change"> -->
        <li class="ListLi" v-for="address in addressList":key="address.id">
          <div class="addressUserPhone">
            <span class="addressUser">{{address.trueName}}</span>
            <span class="addressPhone">{{address.mobile}}</span>
          </div>
  
          <div class="addressUnderstand">
            <div class="Understand" @click="setDefault(address.id)">
            </div>
            <div class="UnderstandImg" style="display:none;">
              <img src="../../assets/mIcon/icon_checked.png" alt="">
            </div>
            <div class="Understand1">
              <span>设置默认</span>
              <span style="display:none;">默认地址</span>
            </div>
            <div class="Understand2">
              <p>{{address.trueAddress}}</p>
            </div>
            <router-link to="./change"><div class="Understand3">修改</div></router-link>
            <div class="Understand4"  @click="deleteAddress(address.id)">
              <span>删除</span>
            </div>
          </div>
        </li>
      <!-- </router-link> -->
      </ul>
    </div>

    <router-link to="/addAddressDetail"><div class="button11">新增地址</div></router-link>
  </div>

</template>

<script>
  import axios from "axios";
  import qs from "qs";
import { Toast } from 'mint-ui';
  export default {
    data(){
      return{
        addressList: [],//地址列表
        mSg:'',//设置默认
      }
    },
      //挂载用户名
  beforeMount(){
    this.userid=localStorage.userid;
  },
    methods:{
      //获取地址列表
      getAddressList() {
        const that = this;
        axios
          .post(
            "/app_address_acquire.htm",
            qs.stringify({
              currentPage: 0,
              user_id: this.userid
            })
          )
          .then(res => {
            console.log(res);
            const { data } = res;
            const { msg, result, status } = data;
            that.addressList = result.map(address => {
              address.trueAddress = `${address.province}${address.city}${address.county}${address.area_info}`;
              return address
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //设置默认地址
      setDefault(id) {
          axios
            .post(
              "/app_set_defaultAddr.htm",
              qs.stringify({
                userId:this.userid,
                addId:id
              })
            ).then(
              res=>{
                console.log(res);
                this.mSg = res.data.msg;
                if(id){
                  console.log(id);
                  Toast("设置成功");
                }
              }
          ).catch(function(err){
                console.log(err);
          })
        },
      //删除地址
        deleteAddress(id){
          axios
            .post(
              "/app_delete_addr.htm",
              qs.stringify({
                add_id:id
              })
            ).then(
            res=>{
                console.log(res);
                Toast("删除成功");
            }
          ).catch(function(err){
            console.log(err);
          })
        },
     },
    mounted(){
      this.getAddressList();
    },
  };
</script>

<style lang="scss">
  .address{
    .HeadAddress{
      position: relative;
      height:1.5rem;
      width:100%;
      background:#f58b3d;
      top: 0;
      position: fixed;
      z-index:999;
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
    .mainAddress{
      background:#f9f9f9;
      height:17.6rem;
      width:100%;
      margin-top:1.5rem;
      margin-bottom: 1.5rem;
      .ListUl{
        position: absolute;
        .ListLi{
          width: 10.2rem;
          height: 2.7rem;
          border-radius:.3rem;
          background:#fff;
          margin:.3rem .3rem 0 .3rem;
          .addressUserPhone{
            position: relative;
            height: 1.11rem;
            line-height:1.11rem;
            .addressUser{
              font-size:.4rem;
              margin-left:.32rem;
            }
            .addressPhone{
              position: absolute;
              right:2rem;
              font-size: .4rem;
            }
          }
          .addressUnderstand{
            height: 1.02rem;
            position: relative;
            .Understand{
              border-radius:50%;
              border:.04rem solid #999999;
              height: .55rem;
              width: .55rem;
              position: absolute;
              top: .21rem;
              left: .3rem;
            }
            .UnderstandImg{
              height: 0.64rem;
              width: .64rem;
              position: absolute;
              top: .16rem;
              left: .3rem;
            }
            .Understand1{
              position: relative;
              margin-left: 1.1rem;
              line-height: 1.1rem;
              span{
                position: absolute;
                color: #999999;

              }
            }
            .Understand2{
              p{
                margin-left:3.1rem;
                font-size:.28rem;
                color:#999999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                width: 50%;
                padding-top: .24rem;
              }
            }
            .Understand3 {
              position: absolute;
              right: .4rem;
              top: -0.8rem;
              color: #333;
            }
            .Understand4 {
              position: absolute;
              right: .4rem;
              top: .5rem;
            }
          }

        }
      }
    }
    .button11{
      position: fixed;
      z-index: 999;
      bottom: 0;
      height: 1.44rem;
      width: 100%;
      color: #fff;
      background: red;
      text-align: center;
      font-size: .5rem;
      line-height: 1.44rem;
    }
  }
</style>